import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getAdminDb } from '@/lib/firebase/admin';
import { getPlanByPaypalId } from '@/lib/plans';
import {
  sendSubscriptionWelcomeEmail,
  sendInternalSubscriptionNotification,
  sendPaymentFailureAlert,
  sendCancellationAlert,
  sendStatusAlert,
} from '@/lib/email';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PayPalWebhookEvent {
  id?: string;
  event_type?: string;
  resource?: unknown;
  create_time?: string;
}

interface SignatureHeaders {
  authAlgo: string;
  certUrl: string;
  transmissionId: string;
  transmissionSig: string;
  transmissionTime: string;
}

type Db = admin.firestore.Firestore;

// ── Signature verification (unchanged from Phase 2) ───────────────────────────

// TODO: Cache the access token until its expires_in window to reduce PayPal API calls.
async function getPayPalAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PayPal token request failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function verifySignature(
  accessToken: string,
  webhookId: string,
  headers: SignatureHeaders,
  rawBody: string
): Promise<boolean> {
  const res = await fetch('https://api-m.paypal.com/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PayPal signature verify failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { verification_status: string };
  return data.verification_status === 'SUCCESS';
}

// ── Resource extraction helpers ───────────────────────────────────────────────

function resource(event: PayPalWebhookEvent): Record<string, unknown> {
  return (event.resource as Record<string, unknown>) ?? {};
}

// For BILLING.SUBSCRIPTION.* events the subscription ID is resource.id.
// For PAYMENT.SALE.* events it is resource.billing_agreement_id.
function subscriptionId(r: Record<string, unknown>): string | null {
  const id = (r.id as string | undefined) ?? (r.billing_agreement_id as string | undefined);
  return id || null;
}

function planId(r: Record<string, unknown>): string | null {
  return (r.plan_id as string | undefined) ?? null;
}

interface SubscriberInfo {
  name?: string;
  email?: string;
  payerId?: string;
}

function extractSubscriber(r: Record<string, unknown>): SubscriberInfo {
  const sub = r.subscriber as Record<string, unknown> | undefined;
  if (!sub) return {};
  const nameObj = sub.name as Record<string, string> | undefined;
  const fullName = [nameObj?.given_name, nameObj?.surname].filter(Boolean).join(' ');
  return {
    name: fullName || undefined,
    email: (sub.email_address as string | undefined) || undefined,
    payerId: (sub.payer_id as string | undefined) || undefined,
  };
}

interface PaymentAmount {
  value?: string;
  currency?: string;
}

function extractAmount(r: Record<string, unknown>): PaymentAmount {
  // BILLING.SUBSCRIPTION.* resources have billing_info.last_payment.amount
  const billing = r.billing_info as Record<string, unknown> | undefined;
  const lastPmt = billing?.last_payment as Record<string, unknown> | undefined;
  const billingAmt = lastPmt?.amount as Record<string, unknown> | undefined;
  if (billingAmt) return { value: billingAmt.value as string, currency: billingAmt.currency_code as string };

  // PAYMENT.SALE.* resources have amount.total / amount.currency
  const saleAmt = r.amount as Record<string, unknown> | undefined;
  if (saleAmt) return { value: saleAmt.total as string, currency: saleAmt.currency as string };

  return {};
}

// ── Firestore helpers ─────────────────────────────────────────────────────────

// Stores the event in paypal_events and checks for duplicates.
// Returns true if this event was already processed.
async function storeEvent(
  db: Db,
  eventId: string,
  eventType: string,
  subId: string | null,
  pId: string | null,
  payload: Record<string, unknown>
): Promise<boolean> {
  const existing = await db.collection('paypal_events').where('paypalEventId', '==', eventId).limit(1).get();
  if (!existing.empty) return true; // duplicate

  await db.collection('paypal_events').add({
    paypalEventId: eventId,
    eventType,
    paypalSubscriptionId: subId,
    paypalPlanId: pId,
    payload,
    receivedAt: admin.firestore.Timestamp.now(),
  });
  return false;
}

async function findCheckoutSession(db: Db, subId: string) {
  const snap = await db.collection('checkout_sessions').where('paypalSubscriptionId', '==', subId).limit(1).get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, data: snap.docs[0].data(), ref: snap.docs[0].ref };
}

async function findSubscription(db: Db, subId: string) {
  const snap = await db.collection('subscriptions').where('paypalSubscriptionId', '==', subId).limit(1).get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, data: snap.docs[0].data(), ref: snap.docs[0].ref };
}

// ── Event handlers ────────────────────────────────────────────────────────────

async function handleActivated(db: Db, event: PayPalWebhookEvent): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  const pId = planId(r);

  if (!subId) {
    console.warn('[PayPal Webhook] ACTIVATED: missing subscription ID in resource');
    return;
  }

  const now = admin.firestore.Timestamp.now();
  const startRaw = (r.start_time as string | undefined) ?? event.create_time;
  const startDate = startRaw ? new Date(startRaw) : now.toDate();
  const startedAt = admin.firestore.Timestamp.fromDate(startDate);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 12);
  const minimumCommitmentEndAt = admin.firestore.Timestamp.fromDate(endDate);

  const subscriber = extractSubscriber(r);
  const plan = pId ? getPlanByPaypalId(pId) : undefined;

  const session = await findCheckoutSession(db, subId);

  if (!session) {
    console.warn('[PayPal Webhook] ACTIVATED: no checkout_session for subscription', subId.slice(0, 12) + '...');
    // Create a minimal subscription record — no welcome email (no client contact)
    const existing = await findSubscription(db, subId);
    if (!existing) {
      await db.collection('subscriptions').add({
        userId: null,
        customerId: null,
        paypalSubscriptionId: subId,
        paypalPlanId: pId ?? null,
        planName: plan?.name ?? 'Unknown Plan',
        monthlyPrice: plan?.price ?? 0,
        currency: plan?.currency ?? 'USD',
        status: 'active',
        startedAt,
        minimumCommitmentMonths: 12,
        minimumCommitmentEndAt,
        acceptedTermsAt: null,
        acceptedMinimumCommitmentAt: null,
        lastPaymentAt: null,
        lastPaymentAmount: null,
        lastPaymentCurrency: null,
        lastPaymentStatus: null,
        cancelledAt: null,
        earlyCancelledWithRemainingCommitment: false,
        checkoutSessionId: null,
        welcomeEmailSentAt: null,
        internalNotificationSentAt: null,
        createdAt: now,
        updatedAt: now,
      });
    }
    return;
  }

  const sd = session.data as Record<string, unknown>;
  const clientName = (sd.clientName as string) ?? '';
  const clientEmail = (sd.clientEmail as string) ?? '';
  const planName = (sd.planName as string) ?? plan?.name ?? 'Website Plan';
  const planPrice = (sd.planPrice as number) ?? plan?.price ?? 0;
  const currency = (sd.currency as string) ?? plan?.currency ?? 'USD';
  const acceptedTermsAt = (sd.acceptedTermsAt as admin.firestore.Timestamp) ?? null;
  const acceptedMinimumCommitmentAt = (sd.acceptedMinimumCommitmentAt as admin.firestore.Timestamp) ?? null;

  // Idempotency: check if subscription already exists
  const existingSub = await findSubscription(db, subId);
  let subDocId: string;
  const alreadyWelcomed = !!(existingSub?.data?.welcomeEmailSentAt);

  if (existingSub) {
    subDocId = existingSub.id;
    if (existingSub.data.status !== 'active') {
      await existingSub.ref.update({ status: 'active', startedAt, minimumCommitmentEndAt, updatedAt: now });
    }
  } else {
    // Create user profile
    const userRef = db.collection('users').doc();
    await userRef.set({ uid: userRef.id, email: clientEmail, name: clientName, role: 'client', createdAt: now, updatedAt: now });

    // Create customer record
    const custRef = db.collection('customers').doc();
    await custRef.set({
      userId: userRef.id,
      email: clientEmail,
      name: clientName,
      paypalPayerId: subscriber.payerId ?? null,
      paypalEmail: subscriber.email ?? null,
      createdAt: now,
      updatedAt: now,
    });

    // Create subscription record
    const subRef = db.collection('subscriptions').doc();
    await subRef.set({
      userId: userRef.id,
      customerId: custRef.id,
      paypalSubscriptionId: subId,
      paypalPlanId: pId ?? null,
      planName,
      monthlyPrice: planPrice,
      currency,
      status: 'active',
      startedAt,
      minimumCommitmentMonths: 12,
      minimumCommitmentEndAt,
      acceptedTermsAt,
      acceptedMinimumCommitmentAt,
      lastPaymentAt: null,
      lastPaymentAmount: null,
      lastPaymentCurrency: null,
      lastPaymentStatus: null,
      cancelledAt: null,
      earlyCancelledWithRemainingCommitment: false,
      checkoutSessionId: session.id,
      welcomeEmailSentAt: null,
      internalNotificationSentAt: null,
      createdAt: now,
      updatedAt: now,
    });
    subDocId = subRef.id;
  }

  // Update checkout session to active
  await session.ref.update({ status: 'active', activatedAt: now, minimumCommitmentEndAt, updatedAt: now });

  if (!alreadyWelcomed) {
    // Welcome email
    const welcomeSent = await sendSubscriptionWelcomeEmail({
      clientName,
      clientEmail,
      planName,
      planPrice,
      currency,
      paypalSubscriptionId: subId,
      minimumCommitmentEndAt: endDate,
    });
    if (welcomeSent) {
      await db.collection('subscriptions').doc(subDocId).update({ welcomeEmailSentAt: now, updatedAt: now });
      await session.ref.update({ welcomeEmailSentAt: now, updatedAt: now });
    }

    // Internal notification
    const notifSent = await sendInternalSubscriptionNotification({
      clientName,
      clientEmail,
      planName,
      planPrice,
      currency,
      paypalSubscriptionId: subId,
      paypalPlanId: pId ?? '',
      checkoutSessionId: session.id,
      minimumCommitmentEndAt: endDate,
      eventType: 'BILLING.SUBSCRIPTION.ACTIVATED',
    });
    if (notifSent) {
      await db.collection('subscriptions').doc(subDocId).update({ internalNotificationSentAt: now, updatedAt: now });
      await session.ref.update({ internalNotificationSentAt: now, updatedAt: now });
    }
  }
}

async function handleCancelled(db: Db, event: PayPalWebhookEvent): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  const pId = planId(r);
  if (!subId) { console.warn('[PayPal Webhook] CANCELLED: missing subscription ID'); return; }

  const now = admin.firestore.Timestamp.now();
  const sub = await findSubscription(db, subId);

  let earlyCancelled = false;
  let clientName: string | undefined;
  let clientEmail: string | undefined;
  let commitEnd: Date | undefined;

  if (sub) {
    const commitEndTs = sub.data.minimumCommitmentEndAt as admin.firestore.Timestamp | undefined;
    commitEnd = commitEndTs?.toDate();
    if (commitEnd && now.toDate() < commitEnd) earlyCancelled = true;

    clientName = sub.data.clientName as string | undefined;
    clientEmail = sub.data.clientEmail as string | undefined;

    await sub.ref.update({ status: 'cancelled', cancelledAt: now, earlyCancelledWithRemainingCommitment: earlyCancelled, updatedAt: now });

    // Sync checkout session
    const session = await findCheckoutSession(db, subId);
    if (session) {
      if (!clientName) clientName = session.data.clientName as string | undefined;
      if (!clientEmail) clientEmail = session.data.clientEmail as string | undefined;
      await session.ref.update({ status: 'cancelled', updatedAt: now });
    }
  } else {
    console.warn('[PayPal Webhook] CANCELLED: no subscription found for', subId.slice(0, 12) + '...');
    // Try checkout session for client info
    const session = await findCheckoutSession(db, subId);
    if (session) {
      clientName = session.data.clientName as string | undefined;
      clientEmail = session.data.clientEmail as string | undefined;
      await session.ref.update({ status: 'cancelled', updatedAt: now });
    }
  }

  await sendCancellationAlert({ paypalSubscriptionId: subId, paypalPlanId: pId ?? undefined, clientName, clientEmail, minimumCommitmentEndAt: commitEnd, earlyCancelledWithRemainingCommitment: earlyCancelled });
}

async function handleExpiredOrSuspended(db: Db, event: PayPalWebhookEvent, newStatus: 'expired' | 'suspended'): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  const pId = planId(r);
  if (!subId) { console.warn(`[PayPal Webhook] ${newStatus.toUpperCase()}: missing subscription ID`); return; }

  const now = admin.firestore.Timestamp.now();
  const sub = await findSubscription(db, subId);

  if (sub) {
    await sub.ref.update({ status: newStatus, updatedAt: now });
    const session = await findCheckoutSession(db, subId);
    if (session) await session.ref.update({ status: newStatus, updatedAt: now });
  } else {
    console.warn(`[PayPal Webhook] ${newStatus.toUpperCase()}: no subscription found for`, subId.slice(0, 12) + '...');
  }

  await sendStatusAlert({ paypalSubscriptionId: subId, paypalPlanId: pId ?? undefined, newStatus, eventType: event.event_type ?? '' });
}

async function handleSaleCompleted(db: Db, event: PayPalWebhookEvent): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  if (!subId) { console.warn('[PayPal Webhook] SALE.COMPLETED: missing subscription ID'); return; }

  const now = admin.firestore.Timestamp.now();
  const amt = extractAmount(r);
  const sub = await findSubscription(db, subId);

  if (sub) {
    await sub.ref.update({
      lastPaymentAt: now,
      lastPaymentAmount: amt.value ?? null,
      lastPaymentCurrency: amt.currency ?? null,
      lastPaymentStatus: 'completed',
      updatedAt: now,
    });
  } else {
    console.warn('[PayPal Webhook] SALE.COMPLETED: no subscription found for', subId.slice(0, 12) + '...');
  }
}

async function handleSaleDenied(db: Db, event: PayPalWebhookEvent): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  const pId = planId(r);
  if (!subId) { console.warn('[PayPal Webhook] SALE.DENIED: missing subscription ID'); return; }

  const now = admin.firestore.Timestamp.now();
  const amt = extractAmount(r);
  const sub = await findSubscription(db, subId);

  if (sub) {
    await sub.ref.update({ lastPaymentStatus: 'denied', updatedAt: now });
  }

  await sendPaymentFailureAlert({
    paypalSubscriptionId: subId,
    paypalPlanId: pId ?? undefined,
    eventType: 'PAYMENT.SALE.DENIED',
    amount: amt.value,
    currency: amt.currency,
    timestamp: event.create_time,
  });
}

async function handleSaleRefunded(db: Db, event: PayPalWebhookEvent): Promise<void> {
  const r = resource(event);
  const subId = subscriptionId(r);
  if (!subId) { console.warn('[PayPal Webhook] SALE.REFUNDED: missing subscription ID'); return; }

  const now = admin.firestore.Timestamp.now();
  const sub = await findSubscription(db, subId);
  if (sub) await sub.ref.update({ lastPaymentStatus: 'refunded', updatedAt: now });

  console.log('[PayPal Webhook] Payment refunded for', subId.slice(0, 12) + '...');
}

// ── Main POST handler ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Read raw body first — signature verification needs the exact bytes.
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Failed to read request body' }, { status: 400 });
  }

  // ── Signature verification ────────────────────────────────────────────────
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (webhookId && clientId && clientSecret) {
    const authAlgo = request.headers.get('paypal-auth-algo');
    const certUrl = request.headers.get('paypal-cert-url');
    const transmissionId = request.headers.get('paypal-transmission-id');
    const transmissionSig = request.headers.get('paypal-transmission-sig');
    const transmissionTime = request.headers.get('paypal-transmission-time');

    if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
      console.error('[PayPal Webhook] Missing signature headers');
      return NextResponse.json({ error: 'Missing PayPal signature headers' }, { status: 400 });
    }

    try {
      const token = await getPayPalAccessToken(clientId, clientSecret);
      const valid = await verifySignature(token, webhookId, { authAlgo, certUrl, transmissionId, transmissionSig, transmissionTime }, rawBody);
      if (!valid) {
        console.error('[PayPal Webhook] Signature verification failed');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    } catch (err) {
      // Return 500 so PayPal retries — do not log secrets.
      console.error('[PayPal Webhook] Signature error:', err instanceof Error ? err.message : 'Unknown');
      return NextResponse.json({ error: 'Signature verification unavailable' }, { status: 500 });
    }
  } else {
    // Skip verification in dev/staging when vars are absent.
    // PAYPAL_WEBHOOK_ID + NEXT_PUBLIC_PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET must all be
    // set in production for signature verification to be active.
    console.warn('[PayPal Webhook] Signature verification skipped — env vars not fully configured.');
  }

  // ── Parse event ───────────────────────────────────────────────────────────
  let event: PayPalWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PayPalWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const eventId = event.id ?? '';
  const eventType = event.event_type ?? 'UNKNOWN';
  const r = resource(event);
  const subId = subscriptionId(r);
  const pId = planId(r);

  console.log('[PayPal Webhook] Received', eventType, { eventId: eventId.slice(0, 16) + '...' });

  // ── Store event & deduplicate ─────────────────────────────────────────────
  // Store first so that if processing fails and PayPal retries, deduplication
  // prevents double side-effects (duplicate emails, double writes).
  let db: Db;
  try {
    db = getAdminDb();
  } catch (err) {
    console.error('[PayPal Webhook] Firebase Admin not initialised:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  if (eventId) {
    try {
      const isDuplicate = await storeEvent(db, eventId, eventType, subId, pId, event as unknown as Record<string, unknown>);
      if (isDuplicate) {
        console.log('[PayPal Webhook] Duplicate event ignored:', eventType, eventId.slice(0, 16) + '...');
        return NextResponse.json({ received: true });
      }
    } catch (err) {
      // Firestore write failed — return 500 so PayPal retries; deduplication will handle the retry.
      console.error('[PayPal Webhook] Failed to store event:', err instanceof Error ? err.message : err);
      return NextResponse.json({ error: 'Failed to store event' }, { status: 500 });
    }
  }

  // ── Dispatch ──────────────────────────────────────────────────────────────
  // All handlers return 200 even on processing errors — the event is already stored,
  // and retrying would just duplicate emails/writes.
  try {
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.CREATED':
        console.log('[PayPal Webhook] Subscription created (no action needed — awaiting ACTIVATED)');
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleActivated(db, event);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleCancelled(db, event);
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await handleExpiredOrSuspended(db, event, 'expired');
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await handleExpiredOrSuspended(db, event, 'suspended');
        break;

      case 'PAYMENT.SALE.COMPLETED':
        await handleSaleCompleted(db, event);
        break;

      case 'PAYMENT.SALE.DENIED':
        await handleSaleDenied(db, event);
        break;

      case 'PAYMENT.SALE.REFUNDED':
        await handleSaleRefunded(db, event);
        break;

      default:
        console.log('[PayPal Webhook] Unhandled event type:', eventType);
    }
  } catch (err) {
    // Processing failed after event storage — log but return 200 to prevent
    // PayPal from retrying indefinitely (the event is already idempotency-guarded).
    console.error('[PayPal Webhook] Handler error for', eventType, ':', err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ received: true });
}
