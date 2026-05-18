import { NextRequest, NextResponse } from 'next/server';

type PayPalEventType =
  | 'BILLING.SUBSCRIPTION.CREATED'
  | 'BILLING.SUBSCRIPTION.ACTIVATED'
  | 'BILLING.SUBSCRIPTION.CANCELLED'
  | 'BILLING.SUBSCRIPTION.EXPIRED'
  | 'PAYMENT.SALE.COMPLETED'
  | 'PAYMENT.SALE.DENIED'
  | 'PAYMENT.SALE.REFUNDED';

interface PayPalWebhookEvent {
  id?: string;
  event_type?: PayPalEventType | string;
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

// Fetch a short-lived OAuth token from PayPal.
// TODO: Cache the token until its expires_in window to avoid a token round-trip per webhook.
async function getPayPalAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`PayPal token request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

// Call PayPal's verify-webhook-signature endpoint.
// Returns true only when PayPal explicitly responds with verification_status === 'SUCCESS'.
// Throws on network / API errors so the caller can decide how to respond.
async function verifySignature(
  accessToken: string,
  webhookId: string,
  headers: SignatureHeaders,
  rawBody: string,
): Promise<boolean> {
  const res = await fetch(
    'https://api-m.paypal.com/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
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
    },
  );

  if (!res.ok) {
    throw new Error(`PayPal signature verify request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { verification_status: string };
  return data.verification_status === 'SUCCESS';
}

export async function POST(request: NextRequest) {
  // Read the raw body as text first — we need the exact bytes for signature verification.
  // Calling request.json() here would consume the stream and make the raw body unavailable.
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
      console.error('[PayPal Webhook] Missing required PayPal signature headers');
      return NextResponse.json({ error: 'Missing PayPal signature headers' }, { status: 400 });
    }

    try {
      const accessToken = await getPayPalAccessToken(clientId, clientSecret);
      const valid = await verifySignature(accessToken, webhookId, {
        authAlgo,
        certUrl,
        transmissionId,
        transmissionSig,
        transmissionTime,
      }, rawBody);

      if (!valid) {
        console.error('[PayPal Webhook] Signature verification failed — rejecting event');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    } catch (err) {
      // Return 500 so PayPal retries delivery; do not log secrets.
      console.error(
        '[PayPal Webhook] Signature verification error:',
        err instanceof Error ? err.message : 'Unknown error',
      );
      return NextResponse.json(
        { error: 'Signature verification unavailable' },
        { status: 500 },
      );
    }
  } else {
    // Graceful degradation: skip verification when env vars are absent.
    // This allows local dev and staging environments to receive test events.
    // All three vars (PAYPAL_WEBHOOK_ID, NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
    // must be set in production for verification to be active.
    console.warn(
      '[PayPal Webhook] Signature verification skipped — ' +
        'PAYPAL_WEBHOOK_ID, NEXT_PUBLIC_PAYPAL_CLIENT_ID, or PAYPAL_CLIENT_SECRET not configured.',
    );
  }

  // ── Parse event ───────────────────────────────────────────────────────────
  let event: PayPalWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PayPalWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { event_type: eventType } = event;

  // ── Event dispatch ────────────────────────────────────────────────────────
  switch (eventType) {
    case 'BILLING.SUBSCRIPTION.CREATED':
      // TODO: Store paypal_subscription_id, paypal_plan_id, plan_name, subscription_status='pending'
      console.log('[PayPal Webhook] Subscription created', { id: event.id });
      break;

    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      // TODO: Set subscription_status = 'active'
      // TODO: Store subscription_started_at, minimum_commitment_start_date
      // TODO: Calculate minimum_commitment_end_date = activation_date + 12 months
      // TODO: Trigger onboarding email to client
      // TODO: Notify admin of new subscription activation
      console.log('[PayPal Webhook] Subscription activated', { id: event.id });
      break;

    case 'BILLING.SUBSCRIPTION.CANCELLED':
      // TODO: Set subscription_status = 'cancelled'
      // TODO: Check if cancellation is before minimum_commitment_end_date
      // TODO: If early, set early_cancelled_with_remaining_commitment = true
      // TODO: Notify admin — client may still owe remaining months
      console.log('[PayPal Webhook] Subscription cancelled', { id: event.id });
      break;

    case 'BILLING.SUBSCRIPTION.EXPIRED':
      // TODO: Set subscription_status = 'expired'
      // TODO: Notify admin
      console.log('[PayPal Webhook] Subscription expired', { id: event.id });
      break;

    case 'PAYMENT.SALE.COMPLETED':
      // TODO: Store payment record, update last_payment_at, last_payment_status = 'completed'
      console.log('[PayPal Webhook] Payment completed', { id: event.id });
      break;

    case 'PAYMENT.SALE.DENIED':
      // TODO: Update last_payment_status = 'denied'
      // TODO: Notify admin and request client update payment method
      // Note: A denied PayPal payment does NOT cancel the 12-month minimum commitment
      console.log('[PayPal Webhook] Payment denied', { id: event.id });
      break;

    case 'PAYMENT.SALE.REFUNDED':
      // TODO: Record refund, update payment status
      console.log('[PayPal Webhook] Payment refunded', { id: event.id });
      break;

    default:
      // Return 200 for unhandled events — do not cause PayPal to retry indefinitely
      console.log('[PayPal Webhook] Unhandled event type:', eventType);
  }

  // Suggested future data model fields:
  // - paypal_subscription_id
  // - paypal_plan_id
  // - plan_name
  // - plan_price
  // - subscription_status
  // - subscription_started_at
  // - minimum_commitment_start_date
  // - minimum_commitment_end_date  (start + 12 months)
  // - last_payment_at
  // - last_payment_status
  // - early_cancelled_with_remaining_commitment (boolean)

  return NextResponse.json({ received: true });
}
