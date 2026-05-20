# PayPal Subscription Setup

This document explains how PayPal subscriptions are integrated into Moonlight Web Designs and what must be configured before the checkout flow works.

---

## Environment variables

All PayPal values are read from environment variables at runtime. **No real credentials are committed to this repository.**

Create a `.env.local` file locally (it is git-ignored) and add the following:

```env
# PayPal — public, safe to expose in the browser
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID=your_standard_plan_id
NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID=your_advanced_plan_id

# PayPal — server only, never expose to the browser
PAYPAL_WEBHOOK_ID=your_paypal_webhook_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Resend — server only, for transactional emails
RESEND_API_KEY=re_your_resend_api_key

# Email — optional overrides (server only)
MOONLIGHT_FROM_EMAIL=noreply@moonlightwebdesigns.com
MOONLIGHT_ADMIN_EMAIL=contact.eterlab@gmail.com
```

> **Never commit `.env.local` or any file containing real credentials.**
> The `.gitignore` ignores `.env`, `.env.local`, and all `.env*.local` variants.

### Configuring in Vercel

Go to **Vercel Dashboard → Project → Settings → Environment Variables** and add each variable:

| Variable | Environment |
|---|---|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Production (+ Preview/Development if testing live) |
| `NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID` | Production (+ Preview/Development if testing live) |
| `NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID` | Production (+ Preview/Development if testing live) |
| `PAYPAL_WEBHOOK_ID` | Production |
| `PAYPAL_CLIENT_SECRET` | Production |
| `RESEND_API_KEY` | Production |
| `MOONLIGHT_FROM_EMAIL` | Production (optional — defaults to `noreply@moonlightwebdesigns.com`) |
| `MOONLIGHT_ADMIN_EMAIL` | Production (optional — defaults to `contact.eterlab@gmail.com`) |

For sandbox testing, create sandbox plans in the PayPal Developer Dashboard and add the sandbox plan IDs and credentials to the **Preview** or **Development** environments.

---

## PayPal plans

Two indefinite monthly subscription plans must exist in your PayPal account. Set their plan IDs in the env vars above:

- **Standard Website Plan** — $199/month → `NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID`
- **Advanced Website Plan** — $349/month → `NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID`

Plans are configured as indefinite monthly billing — they do not expire after 12 months. The 12-month minimum commitment is a business/contractual obligation enforced via the UI confirmation modal and the Terms of Service, not by the PayPal plan duration.

---

## Webhook configuration

### Webhook endpoint

The webhook handler lives at:

```
/api/webhooks/paypal
```

**The webhook URL in the PayPal dashboard must be set to:**

```
https://moonlightwebdesigns.com/api/webhooks/paypal
```

### Webhook ID

Set the webhook ID from the PayPal dashboard as the `PAYPAL_WEBHOOK_ID` environment variable.

### Tracked events

The handler processes the following PayPal webhook events:

| Event | Action |
|---|---|
| `BILLING.SUBSCRIPTION.ACTIVATED` | Creates user, customer, and subscription records in Firestore; sends welcome email to client and internal notification |
| `BILLING.SUBSCRIPTION.CANCELLED` | Updates subscription status to `cancelled`; flags early cancellation if before `minimumCommitmentEndAt`; sends internal alert |
| `BILLING.SUBSCRIPTION.EXPIRED` | Updates subscription status to `expired`; sends internal alert |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Updates subscription status to `suspended`; sends internal alert |
| `PAYMENT.SALE.COMPLETED` | Updates last payment fields on the subscription record |
| `PAYMENT.SALE.DENIED` | Sends payment failure alert to admin |
| `PAYMENT.SALE.REFUNDED` | Sends payment failure alert to admin |

All inbound events are stored in the `paypal_events` Firestore collection before any processing. **The handler returns `200` after the event is stored even if subsequent processing fails** — this prevents PayPal infinite retries. It returns `500` only if the event itself cannot be stored (PayPal will retry; deduplication handles the retry).

### Webhook signature verification

The handler at `src/app/api/webhooks/paypal/route.ts` verifies the PayPal webhook signature on every inbound request using `PAYPAL_WEBHOOK_ID`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, and `PAYPAL_CLIENT_SECRET`.

If any of the three env vars are absent (e.g. in local dev), verification is skipped with a console warning and events are processed unverified. **All three vars must be set in production.**

---

## Idempotency

Every `BILLING.SUBSCRIPTION.ACTIVATED` event is deduplicated at two levels:

1. **Event deduplication** — the `paypal_events` collection is checked by `paypalEventId` before any processing. If the event is already stored, processing is skipped.
2. **Email deduplication** — `welcomeEmailSentAt` and `internalNotificationSentAt` timestamps on the subscription document prevent duplicate emails if the same event is processed more than once.

This means it is safe for PayPal to replay events or for the webhook to be called multiple times for the same activation.

---

## Early cancellation detection

When `BILLING.SUBSCRIPTION.CANCELLED` is received, the handler compares the cancellation timestamp against the subscription's `minimumCommitmentEndAt` field. If cancelled before the end of the 12-month minimum, `earlyCancelledWithRemainingCommitment` is set to `true` on the subscription document and the internal alert includes a prominent warning.

---

## 12-Month Minimum Contract Handling

Moonlight Web Designs plans are billed monthly through PayPal but include a 12-month minimum commitment. PayPal is used only as the recurring payment method.

The minimum commitment is enforced at four layers:

1. **Pricing UI** — The 12-month minimum is displayed on every pricing card below the CTA.
2. **Confirmation modal** — Before subscribing via PayPal, the user must acknowledge:
   - The plan name and price
   - That PayPal is only the payment method, not the governing agreement
   - That cancelling PayPal does not cancel the 12-month contractual commitment
   - A required Terms of Service checkbox (Subscribe button stays disabled until checked)
3. **Terms of Service** — `/terms` contains explicit sections covering the minimum commitment, PayPal as payment method, and early PayPal cancellation not relieving the contractual obligation.
4. **Backend records** — The webhook handler stores `acceptedTermsAt`, `acceptedMinimumCommitmentAt`, `activatedAt`, and `minimumCommitmentEndAt` (activation + 12 months) on the subscription document.

---

## Checkout flow (Phase 2)

The checkout flow uses the PayPal JS SDK (not hosted PayPal subscription links):

1. **User opens pricing modal** — enters name, email, accepts Terms of Service.
2. **`POST /api/checkout/session`** — creates a `checkout_sessions` Firestore document with `status: pending`.
3. **PayPal Buttons render** — the user approves the subscription in PayPal's native UI.
4. **`PATCH /api/checkout/session`** — stores the `paypalSubscriptionId` returned by PayPal and sets `status: paypal_approved`. This does **not** mean the subscription is active.
5. **User is redirected to `/thank-you`** — a UX confirmation page, not a proof of an active subscription.
6. **`BILLING.SUBSCRIPTION.ACTIVATED` webhook** — PayPal confirms activation; the webhook handler sets `status: active`, creates all records, and sends emails. **This is the source of truth.**

### Plan config

Plan prices are defined server-side in `src/lib/plans.ts`. The API routes use this config — never trust prices submitted from the client.

### New API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/checkout/session` | `POST` | Create a `checkout_session` doc before PayPal |
| `/api/checkout/session` | `PATCH` | Store `paypalSubscriptionId` and set `status: paypal_approved` after onApprove |

---

## Transactional emails (Phase 3)

Emails are sent via the [Resend](https://resend.com) API using direct HTTP calls (no SDK dependency). If `RESEND_API_KEY` is not configured, all email functions return `false` and log a warning — the webhook continues processing without failing.

### Emails sent

| Trigger | Recipient | Content |
|---|---|---|
| `BILLING.SUBSCRIPTION.ACTIVATED` | Client email | Welcome email with plan details, portal link, minimum term end date |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Admin | New activation summary (client name, email, plan, PayPal IDs, minimum term end) |
| `BILLING.SUBSCRIPTION.CANCELLED` | Admin | Cancellation alert with early-cancellation warning if applicable |
| `BILLING.SUBSCRIPTION.EXPIRED` | Admin | Status change alert |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Admin | Status change alert |
| `PAYMENT.SALE.DENIED` | Admin | Payment failure alert |
| `PAYMENT.SALE.REFUNDED` | Admin | Payment failure alert |

Welcome and internal notification emails are idempotent — they will not be sent more than once per subscription, even if the webhook replays.

---

## Thank-you page

Route: `/thank-you`

Users land here after completing the PayPal subscription flow. The page:

- Confirms the subscription was submitted to PayPal
- Shows the PayPal `subscription_id` if present in the query string (`?subscription_id=...`)
- Links to the client portal and homepage
- Notes that the subscription is **not yet active** — PayPal will confirm via webhook

> To redirect users here automatically after PayPal checkout, update the plan's **Return URL** in the PayPal dashboard to `https://moonlightwebdesigns.com/thank-you`.
