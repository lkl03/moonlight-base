const fromEmail = (): string =>
  process.env.MOONLIGHT_FROM_EMAIL ?? 'noreply@moonlightwebdesigns.com';

const adminEmail = (): string =>
  process.env.MOONLIGHT_ADMIN_EMAIL ?? 'contact.eterlab@gmail.com';

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not configured — skipping email');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail(),
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Resend API error ${res.status}: ${body}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email] Failed to send email:', err instanceof Error ? err.message : 'Unknown');
    return false;
  }
}

// ── Welcome email ────────────────────────────────────────────────────────────

export interface WelcomeEmailParams {
  clientName: string;
  clientEmail: string;
  planName: string;
  planPrice: number;
  currency: string;
  paypalSubscriptionId: string;
  minimumCommitmentEndAt: Date;
}

export async function sendSubscriptionWelcomeEmail(
  params: WelcomeEmailParams
): Promise<boolean> {
  const { clientName, clientEmail, planName, planPrice, currency, paypalSubscriptionId, minimumCommitmentEndAt } = params;
  const endStr = fmtDate(minimumCommitmentEndAt);
  const priceStr = `$${planPrice} ${currency}`;

  const text = [
    `Hi ${clientName},`,
    '',
    `Thanks for subscribing to the ${planName}. Your subscription is now active.`,
    '',
    'Here are your subscription details:',
    '',
    `Plan: ${planName}`,
    `Monthly price: ${priceStr}`,
    'Billing method: PayPal',
    'Minimum commitment: 12 months',
    `Minimum term end date: ${endStr}`,
    '',
    'Next step:',
    "We'll send your onboarding form shortly so we can collect your business details,",
    'website preferences, content, and launch requirements.',
    '',
    'You can access your client portal at:',
    'https://moonlightwebdesigns.com/portal',
    '',
    'If you have any questions, just reply to this email.',
    '',
    'Best,',
    'Moonlight Web Designs',
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Raleway,Arial,sans-serif;color:#121717;max-width:580px;margin:0 auto;padding:32px 24px;background:#fff">
  <h1 style="font-size:1.4rem;font-weight:900;margin:0 0 1rem;font-family:Inter,Arial,sans-serif">Your Moonlight Web Designs subscription is active</h1>
  <p style="margin:0 0 0.5rem">Hi ${clientName},</p>
  <p style="margin:0 0 1.25rem">Thanks for subscribing to the <strong>${planName}</strong>. Your subscription is now active.</p>
  <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.9rem">Here are your subscription details:</p>
  <table style="width:100%;border-collapse:collapse;margin:0.75rem 0 1.5rem;font-size:0.9rem">
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555;width:50%">Plan</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${planName}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Monthly price</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${priceStr}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Billing method</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">PayPal</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Minimum commitment</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">12 months</td></tr>
    <tr><td style="padding:8px 0;color:#555">Minimum term end date</td><td style="padding:8px 0;font-weight:600">${endStr}</td></tr>
  </table>
  <p style="margin:0 0 0.4rem;font-weight:600;font-size:0.9rem">Next step</p>
  <p style="margin:0 0 1.5rem;color:#444">We'll send your onboarding form shortly so we can collect your business details, website preferences, content, and launch requirements.</p>
  <p style="margin:0 0 1.5rem">
    <a href="https://moonlightwebdesigns.com/portal"
       style="display:inline-block;background:#45a383;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.95rem">
      Access Client Portal
    </a>
  </p>
  <p style="margin:0 0 1.5rem;color:#444">If you have any questions, just reply to this email.</p>
  <p style="margin:0">Best,<br>Moonlight Web Designs</p>
  <hr style="border:0;border-top:1px solid #eee;margin:1.5rem 0">
  <p style="font-size:0.75rem;color:#aaa">PayPal subscription reference: ${paypalSubscriptionId}</p>
</body>
</html>`;

  return sendEmail({ to: clientEmail, subject: 'Your Moonlight Web Designs subscription is active', html, text });
}

// ── Internal activation notification ────────────────────────────────────────

export interface InternalNotificationParams {
  clientName: string;
  clientEmail: string;
  planName: string;
  planPrice: number;
  currency: string;
  paypalSubscriptionId: string;
  paypalPlanId: string;
  checkoutSessionId?: string;
  minimumCommitmentEndAt: Date;
  eventType: string;
}

export async function sendInternalSubscriptionNotification(
  params: InternalNotificationParams
): Promise<boolean> {
  const { clientName, clientEmail, planName, planPrice, currency, paypalSubscriptionId, paypalPlanId, checkoutSessionId, minimumCommitmentEndAt, eventType } = params;

  const lines = [
    'New subscription activated.',
    '',
    `Client name:               ${clientName}`,
    `Client email:              ${clientEmail}`,
    `Plan:                      ${planName}`,
    `Price:                     $${planPrice} ${currency}/month`,
    `PayPal subscription ID:    ${paypalSubscriptionId}`,
    `PayPal plan ID:            ${paypalPlanId}`,
    checkoutSessionId ? `Checkout session ID:       ${checkoutSessionId}` : null,
    `Minimum commitment end:    ${fmtDate(minimumCommitmentEndAt)}`,
    `Event type:                ${eventType}`,
  ].filter(Boolean).join('\n');

  return sendEmail({
    to: adminEmail(),
    subject: 'New Moonlight subscription activated',
    text: lines,
    html: `<pre style="font-family:monospace;font-size:14px;line-height:1.7;color:#121717">${lines}</pre>`,
  });
}

// ── Payment failure alert ────────────────────────────────────────────────────

export interface PaymentFailureParams {
  paypalSubscriptionId: string;
  paypalPlanId?: string;
  eventType: string;
  amount?: string;
  currency?: string;
  timestamp?: string;
}

export async function sendPaymentFailureAlert(params: PaymentFailureParams): Promise<boolean> {
  const lines = [
    'A PayPal payment has failed or been denied.',
    '',
    `Event type:             ${params.eventType}`,
    `PayPal subscription ID: ${params.paypalSubscriptionId}`,
    params.paypalPlanId ? `PayPal plan ID:         ${params.paypalPlanId}` : null,
    params.amount && params.currency ? `Amount:                 ${params.amount} ${params.currency}` : null,
    params.timestamp ? `Timestamp:              ${params.timestamp}` : null,
  ].filter(Boolean).join('\n');

  return sendEmail({
    to: adminEmail(),
    subject: 'Moonlight payment failed or denied',
    text: lines,
    html: `<pre style="font-family:monospace;font-size:14px;line-height:1.7;color:#121717">${lines}</pre>`,
  });
}

// ── Cancellation alert ───────────────────────────────────────────────────────

export interface CancellationParams {
  paypalSubscriptionId: string;
  paypalPlanId?: string;
  clientName?: string;
  clientEmail?: string;
  minimumCommitmentEndAt?: Date;
  earlyCancelledWithRemainingCommitment: boolean;
}

export async function sendCancellationAlert(params: CancellationParams): Promise<boolean> {
  const { paypalSubscriptionId, paypalPlanId, clientName, clientEmail, minimumCommitmentEndAt, earlyCancelledWithRemainingCommitment } = params;

  const lines = [
    'A PayPal subscription has been cancelled.',
    '',
    `PayPal subscription ID:           ${paypalSubscriptionId}`,
    paypalPlanId ? `PayPal plan ID:                   ${paypalPlanId}` : null,
    clientName ? `Client name:                      ${clientName}` : null,
    clientEmail ? `Client email:                     ${clientEmail}` : null,
    minimumCommitmentEndAt ? `Minimum commitment end:           ${fmtDate(minimumCommitmentEndAt)}` : null,
    `Early cancellation (owes months): ${earlyCancelledWithRemainingCommitment ? 'YES — client may owe remaining months' : 'No'}`,
  ].filter(Boolean).join('\n');

  return sendEmail({
    to: adminEmail(),
    subject: 'Moonlight subscription cancelled',
    text: lines,
    html: `<pre style="font-family:monospace;font-size:14px;line-height:1.7;color:#121717">${lines}</pre>`,
  });
}

// ── Status/suspended alert (generic internal) ────────────────────────────────

export interface StatusAlertParams {
  paypalSubscriptionId: string;
  paypalPlanId?: string;
  newStatus: string;
  eventType: string;
}

export async function sendStatusAlert(params: StatusAlertParams): Promise<boolean> {
  const lines = [
    `A PayPal subscription status changed to: ${params.newStatus}`,
    '',
    `Event type:             ${params.eventType}`,
    `PayPal subscription ID: ${params.paypalSubscriptionId}`,
    params.paypalPlanId ? `PayPal plan ID:         ${params.paypalPlanId}` : null,
  ].filter(Boolean).join('\n');

  return sendEmail({
    to: adminEmail(),
    subject: `Moonlight subscription ${params.newStatus}`,
    text: lines,
    html: `<pre style="font-family:monospace;font-size:14px;line-height:1.7;color:#121717">${lines}</pre>`,
  });
}

// ── Magic link / portal login email ─────────────────────────────────────────

export interface MagicLinkEmailParams {
  to: string;
  link: string;
}

export async function sendMagicLinkEmail(params: MagicLinkEmailParams): Promise<boolean> {
  const text = [
    'Hi,',
    '',
    "Here's your secure login link for the Moonlight Web Designs client portal.",
    '',
    `Sign in: ${params.link}`,
    '',
    'This link expires in 1 hour and can only be used once.',
    '',
    "If you didn't request this, you can safely ignore this email.",
    '',
    'Best,',
    'Moonlight Web Designs',
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Raleway,Arial,sans-serif;color:#121717;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff">
  <h2 style="font-size:1.2rem;font-weight:900;margin:0 0 1.25rem;font-family:Inter,Arial,sans-serif">
    Your Moonlight Web Designs login link
  </h2>
  <p style="margin:0 0 1rem">Click the button below to sign in to your client portal.</p>
  <p style="margin:0 0 1.5rem">
    <a href="${params.link}"
       style="display:inline-block;background:#45a383;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.95rem">
      Sign in to Client Portal
    </a>
  </p>
  <p style="margin:0 0 0.5rem;font-size:0.85rem;color:#666">
    This link expires in <strong>1 hour</strong> and can only be used once.
  </p>
  <p style="margin:0 0 1.5rem;font-size:0.85rem;color:#666">
    If you didn&apos;t request this, you can safely ignore this email.
  </p>
  <hr style="border:0;border-top:1px solid #eee;margin:1.5rem 0">
  <p style="font-size:0.75rem;color:#aaa;margin:0">Moonlight Web Designs</p>
</body>
</html>`;

  return sendEmail({
    to: params.to,
    subject: 'Your Moonlight Web Designs login link',
    html,
    text,
  });
}

// ── Onboarding notification (internal) ───────────────────────────────────────

export interface OnboardingNotificationParams {
  clientName: string;
  clientEmail: string;
  businessName: string;
  planName: string;
  paypalSubscriptionId: string;
  primaryGoal: string;
  launchTimeline: string;
}

export async function sendOnboardingNotificationEmail(
  params: OnboardingNotificationParams
): Promise<boolean> {
  const { clientName, clientEmail, businessName, planName, paypalSubscriptionId, primaryGoal, launchTimeline } = params;

  const lines = [
    'A client has submitted their onboarding form.',
    '',
    `Client name:            ${clientName}`,
    `Client email:           ${clientEmail}`,
    `Business name:          ${businessName}`,
    `Plan:                   ${planName}`,
    `PayPal subscription ID: ${paypalSubscriptionId}`,
    `Primary goal:           ${primaryGoal}`,
    `Launch timeline:        ${launchTimeline}`,
  ].join('\n');

  return sendEmail({
    to: adminEmail(),
    subject: `Onboarding submitted — ${businessName}`,
    text: lines,
    html: `<pre style="font-family:monospace;font-size:14px;line-height:1.7;color:#121717">${lines}</pre>`,
  });
}

// ── Onboarding confirmation (client-facing) ───────────────────────────────────

export interface OnboardingConfirmationParams {
  clientName: string;
  clientEmail: string;
  businessName: string;
}

export async function sendOnboardingConfirmationEmail(
  params: OnboardingConfirmationParams
): Promise<boolean> {
  const { clientName, clientEmail, businessName } = params;

  const text = [
    `Hi ${clientName},`,
    '',
    `We've received your onboarding details for ${businessName}. We'll review everything and be in touch soon to get your project started.`,
    '',
    'If you need to update anything or have questions, just reply to this email.',
    '',
    'Best,',
    'Moonlight Web Designs',
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Raleway,Arial,sans-serif;color:#121717;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff">
  <h2 style="font-size:1.2rem;font-weight:900;margin:0 0 1.25rem;font-family:Inter,Arial,sans-serif">
    Onboarding received — ${businessName}
  </h2>
  <p style="margin:0 0 1rem">Hi ${clientName},</p>
  <p style="margin:0 0 1.5rem">We've received your onboarding details for <strong>${businessName}</strong>. We'll review everything and be in touch soon to get your project started.</p>
  <p style="margin:0 0 1.5rem;color:#444">If you need to update anything or have questions, just reply to this email.</p>
  <hr style="border:0;border-top:1px solid #eee;margin:1.5rem 0">
  <p style="font-size:0.75rem;color:#aaa;margin:0">Moonlight Web Designs</p>
</body>
</html>`;

  return sendEmail({
    to: clientEmail,
    subject: `Onboarding received — ${businessName}`,
    html,
    text,
  });
}
