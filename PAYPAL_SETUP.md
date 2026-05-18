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

For sandbox testing, create sandbox plans in the PayPal Developer Dashboard and add the sandbox plan IDs and credentials to the **Preview** or **Development** environments instead.

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

The previous webhook URL pointed to the homepage (`https://moonlightwebdesigns.com/`) — this must be corrected in the PayPal dashboard.

### Webhook ID

Set the webhook ID from the PayPal dashboard as the `PAYPAL_WEBHOOK_ID` environment variable.

### Tracked events

The handler processes the following PayPal webhook events:

- `BILLING.SUBSCRIPTION.CREATED`
- `BILLING.SUBSCRIPTION.ACTIVATED`
- `BILLING.SUBSCRIPTION.CANCELLED`
- `BILLING.SUBSCRIPTION.EXPIRED`
- `PAYMENT.SALE.COMPLETED`
- `PAYMENT.SALE.DENIED`
- `PAYMENT.SALE.REFUNDED`

### Webhook signature verification

The handler at `src/app/api/webhooks/paypal/route.ts` verifies the PayPal webhook signature on every inbound request using `PAYPAL_WEBHOOK_ID`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, and `PAYPAL_CLIENT_SECRET`.

If any of the three env vars are absent (e.g. in local dev), verification is skipped with a console warning and events are processed unverified. **All three vars must be set in production.**

---

## Sandbox vs live

- The current integration uses **hosted PayPal subscription URLs** pointing directly to `https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=<PLAN_ID>`.
- To test with sandbox, create sandbox plans in the PayPal Developer Dashboard and set the sandbox plan IDs and credentials in your Preview/Development environment variables on Vercel.

---

## 12-Month Minimum Contract Handling

Moonlight Web Designs plans are billed monthly through PayPal but include a 12-month minimum commitment. PayPal is used only as the recurring payment method.

The minimum commitment is enforced at three layers:

1. **Pricing UI** — The 12-month minimum is displayed on every pricing card below the CTA.
2. **Confirmation modal** — Before redirecting to PayPal, the user must acknowledge:
   - The plan name and price
   - That PayPal is only the payment method, not the governing agreement
   - That cancelling PayPal does not cancel the 12-month contractual commitment
   - A required Terms of Service checkbox (Subscribe button stays disabled until checked)
3. **Terms of Service** — `/terms` contains explicit sections covering the minimum commitment, PayPal as payment method, and early PayPal cancellation not relieving the contractual obligation.

**Future backend work** should store:
- Acceptance timestamp of the Terms / 12-month commitment checkbox
- PayPal subscription ID (from `BILLING.SUBSCRIPTION.ACTIVATED`)
- Activation date and minimum commitment end date (activation + 12 months)
- Early-cancellation flag if cancelled before the minimum commitment end date

See TODOs in:
- `src/app/api/webhooks/paypal/route.ts`
- `src/components/UI/PricingSection/PayPalModal.tsx`

---

## Thank-you page

Route: `/thank-you`

Users land here after completing the PayPal subscription flow. The page confirms the subscription and reiterates the 12-month minimum contract.

> To redirect users here automatically after PayPal checkout, update the plan's **Return URL** in the PayPal dashboard to `https://moonlightwebdesigns.com/thank-you`.

---

## Onboarding email (future)

Once a backend is in place, trigger an onboarding email when `BILLING.SUBSCRIPTION.ACTIVATED` is received. Suggested content:

```
Subject: Moonlight Web Designs — Subscription Confirmation

Hi [Client Name],

Thanks for subscribing to the [Standard/Advanced] Website Plan.

Plan:              [Standard/Advanced] Website Plan
Monthly price:     [$199/$349] USD
Billing method:    PayPal subscription
Minimum term:      12 months
Minimum term end:  [Activation date + 12 months]

As stated in our Terms of Service, the PayPal subscription is used as the
payment method. The 12-month minimum commitment remains in effect even if
the PayPal subscription is cancelled, paused, blocked, or otherwise disabled
before the end of the minimum term.

— Moonlight Web Designs
contact.eterlab@gmail.com
```
