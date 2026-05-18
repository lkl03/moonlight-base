# PayPal Subscription Setup

This document explains how PayPal subscriptions are integrated into Moonlight Web Designs and what needs to be configured.

---

## Required environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# PayPal — public (safe to expose in the browser)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID=P-13965659MR530714MNIFH6ZQ
NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID=P-1W79682320254352RNIFH7JY

# PayPal — server only (NEVER expose these in the browser)
PAYPAL_WEBHOOK_ID=your_paypal_webhook_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

> **Important:** Never commit `.env.local` or any file containing real secrets to version control. `.env.example` contains placeholders only.

---

## PayPal plan IDs

| Plan     | Price       | PayPal Plan ID                        |
|----------|-------------|---------------------------------------|
| Standard | $199/month  | `P-13965659MR530714MNIFH6ZQ`          |
| Advanced | $349/month  | `P-1W79682320254352RNIFH7JY`          |

These plan IDs correspond to indefinite monthly billing plans created in the live PayPal app **moonlight-web-designs** (`contact.eterlab@gmail.com`).

---

## Sandbox vs live

- The current integration uses **hosted PayPal subscription URLs** (Option A), which always point to the live PayPal environment via:
  ```
  https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=<PLAN_ID>
  ```
- To test with a sandbox, create sandbox plans in the PayPal Developer Dashboard and update the `NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID` and `NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID` env vars to sandbox plan IDs.

---

## Webhook configuration

### Current webhook URL (needs updating)

The PayPal webhook is currently configured to point to the site homepage, which is incorrect.

**The webhook URL in the PayPal dashboard must be updated to:**

```
https://moonlightwebdesigns.com/api/webhooks/paypal
```

### Webhook ID

```
82499841YL703803E
```

### Tracked events

The following PayPal webhook events are handled at `/api/webhooks/paypal`:

- `BILLING.SUBSCRIPTION.CREATED`
- `BILLING.SUBSCRIPTION.ACTIVATED`
- `BILLING.SUBSCRIPTION.CANCELLED`
- `BILLING.SUBSCRIPTION.EXPIRED`
- `PAYMENT.SALE.COMPLETED`
- `PAYMENT.SALE.DENIED`
- `PAYMENT.SALE.REFUNDED`

### Webhook signature verification (TODO)

The current webhook handler logs events but does **not yet verify PayPal webhook signatures**. Before going to production, implement signature verification using the `PAYPAL_WEBHOOK_ID` and `PAYPAL_CLIENT_SECRET` env vars.

Reference: https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature

---

## 12-Month Minimum Contract Handling

Moonlight Web Designs plans are billed monthly through PayPal but include a 12-month minimum commitment.

**PayPal is used only as the recurring payment method.** Because customers can cancel or disable automatic payments from their PayPal account, the minimum commitment is handled at three layers:

1. **Pricing UI** — The 12-month minimum is shown on every pricing card below the CTA.
2. **Confirmation modal** — Before redirecting to PayPal, users must read a confirmation explaining:
   - The plan price and name
   - That billing is through PayPal
   - That PayPal is only the payment method, not the governing agreement
   - That cancelling or disabling PayPal does not end the contractual 12-month commitment
3. **Terms of Service** — The `/terms` page contains explicit sections on the minimum commitment, PayPal as payment method, and early PayPal cancellation not cancelling the contractual obligation.

**Future backend work** should store:
- The acceptance timestamp of the Terms / 12-month commitment checkbox
- The PayPal subscription ID on activation
- The activation date
- The minimum commitment end date (activation date + 12 months)
- Whether an early cancellation occurred before the minimum commitment end date

See the TODOs in:
- `src/app/api/webhooks/paypal/route.ts`
- `src/components/UI/PricingSection/PayPalModal.tsx`

---

## Thank-you page

Route: `/thank-you`

After a successful subscription, users can be directed to `/thank-you`. This page confirms the subscription and reminds the user of the 12-month minimum contract.

> Note: Hosted PayPal subscription URLs do not automatically redirect to a return URL unless a `return_url` is configured in the PayPal subscription plan settings. Update the plan's return URL in the PayPal dashboard to `https://moonlightwebdesigns.com/thank-you`.

---

## Subscription plan settings

PayPal subscriptions are configured as **indefinite monthly billing plans** — they do not expire automatically after 12 months.

The 12-month minimum commitment is a business/contractual obligation, not a PayPal billing configuration. Clients subscribe indefinitely and are contractually obligated to maintain payments for at least 12 months.

---

## Onboarding email (future)

Once a backend is in place, trigger an onboarding confirmation email when `BILLING.SUBSCRIPTION.ACTIVATED` is received. Suggested content:

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

We'll follow up shortly with onboarding steps.

— Moonlight Web Designs
contact.eterlab@gmail.com
```
