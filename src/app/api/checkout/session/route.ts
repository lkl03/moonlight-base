import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { isPlanKey, getPlan } from '@/lib/plans';
import * as admin from 'firebase-admin';

// POST /api/checkout/session
// Creates a Firestore checkout_session document before the user interacts with PayPal.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { planKey, clientName, clientEmail, acceptedTerms, acceptedMinimumCommitment } =
    body as Record<string, unknown>;

  // Validate required fields
  if (!isPlanKey(planKey)) {
    return NextResponse.json(
      { error: 'planKey must be "standard" or "advanced"' },
      { status: 400 }
    );
  }
  if (typeof clientName !== 'string' || !clientName.trim()) {
    return NextResponse.json({ error: 'clientName is required' }, { status: 400 });
  }
  if (typeof clientEmail !== 'string' || !clientEmail.trim()) {
    return NextResponse.json({ error: 'clientEmail is required' }, { status: 400 });
  }
  if (acceptedTerms !== true) {
    return NextResponse.json({ error: 'acceptedTerms must be true' }, { status: 400 });
  }
  if (acceptedMinimumCommitment !== true) {
    return NextResponse.json(
      { error: 'acceptedMinimumCommitment must be true' },
      { status: 400 }
    );
  }

  // Look up plan from server-side config — never trust client-submitted price
  const plan = getPlan(planKey);
  if (!plan.paypalPlanId) {
    return NextResponse.json(
      { error: 'PayPal plan ID is not configured for this plan' },
      { status: 500 }
    );
  }

  const now = admin.firestore.Timestamp.now();

  try {
    const docRef = getAdminDb().collection('checkout_sessions').doc();
    await docRef.set({
      planName: plan.name,
      paypalPlanId: plan.paypalPlanId,
      planPrice: plan.price,
      currency: plan.currency,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim().toLowerCase(),
      acceptedTerms: true,
      acceptedTermsAt: now,
      acceptedMinimumCommitment: true,
      acceptedMinimumCommitmentAt: now,
      minimumCommitmentMonths: plan.minimumCommitmentMonths,
      status: 'pending',
      paypalSubscriptionId: null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      checkoutSessionId: docRef.id,
      planName: plan.name,
      paypalPlanId: plan.paypalPlanId,
      planPrice: plan.price,
      currency: plan.currency,
    });
  } catch (err) {
    console.error('[checkout/session POST] Firestore error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}

// PATCH /api/checkout/session
// Updates a checkout_session with the PayPal subscription ID after onApprove.
// This does NOT mark the subscription as active — the webhook is the source of truth.
export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { checkoutSessionId, paypalSubscriptionId } = body as Record<string, unknown>;

  if (typeof checkoutSessionId !== 'string' || !checkoutSessionId.trim()) {
    return NextResponse.json({ error: 'checkoutSessionId is required' }, { status: 400 });
  }
  if (typeof paypalSubscriptionId !== 'string' || !paypalSubscriptionId.trim()) {
    return NextResponse.json({ error: 'paypalSubscriptionId is required' }, { status: 400 });
  }

  const now = admin.firestore.Timestamp.now();

  try {
    await getAdminDb().collection('checkout_sessions').doc(checkoutSessionId).update({
      paypalSubscriptionId: paypalSubscriptionId.trim(),
      // paypal_approved means PayPal onApprove fired — NOT that the subscription is active.
      // The webhook handler (Phase 3) will set status to 'active' when PayPal confirms.
      status: 'paypal_approved',
      approvedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[checkout/session PATCH] Firestore error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: 'Failed to update checkout session.' },
      { status: 500 }
    );
  }
}
