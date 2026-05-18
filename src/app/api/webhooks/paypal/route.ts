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

export async function POST(request: NextRequest) {
  let event: PayPalWebhookEvent;

  try {
    event = (await request.json()) as PayPalWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // TODO: Verify PayPal webhook signature before trusting the payload.
  // Required env vars: PAYPAL_WEBHOOK_ID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
  // See: https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature
  // Until signature verification is implemented, treat all events as unverified.

  const { event_type: eventType, resource } = event;

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
      // Return 200 for unhandled events — do not let unknown events cause retries
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
