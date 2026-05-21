# Production Checklist

Complete this checklist before switching Moonlight Web Designs to live traffic.

---

## A. PayPal

- [ ] Confirm live **Client ID** is set in `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (Vercel Production env)
- [ ] Confirm live **Standard plan ID** is set in `NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID`
- [ ] Confirm live **Advanced plan ID** is set in `NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID`
- [ ] Confirm plan prices in PayPal dashboard match prices in `src/lib/plans.ts`
- [ ] Confirm **Webhook URL** is configured in PayPal Developer dashboard:
  ```
  https://moonlightwebdesigns.com/api/webhooks/paypal
  ```
- [ ] Confirm the following **webhook event types** are enabled:
  - `BILLING.SUBSCRIPTION.CREATED`
  - `BILLING.SUBSCRIPTION.ACTIVATED`
  - `BILLING.SUBSCRIPTION.CANCELLED`
  - `BILLING.SUBSCRIPTION.EXPIRED`
  - `BILLING.SUBSCRIPTION.SUSPENDED`
  - `PAYMENT.SALE.COMPLETED`
  - `PAYMENT.SALE.DENIED`
  - `PAYMENT.SALE.REFUNDED`
- [ ] Copy the **Webhook ID** from PayPal Developer → Webhooks and set `PAYPAL_WEBHOOK_ID` in Vercel Production
- [ ] Set `PAYPAL_CLIENT_SECRET` in Vercel Production (live secret, not sandbox)
- [ ] Webhook signature verification is active when all three vars are present:
  `PAYPAL_WEBHOOK_ID`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
- [ ] Delete any **sandbox/test PayPal subscriptions** before launch
- [ ] Confirm there are no `$0.10` test plan IDs remaining in Vercel env vars

---

## B. Firebase

- [ ] Firebase Authentication is enabled (Build → Authentication)
- [ ] **Email/Password** sign-in method is enabled
- [ ] **Email link (passwordless)** sign-in sub-option is enabled
- [ ] `moonlightwebdesigns.com` is listed under **Authentication → Settings → Authorized domains**
- [ ] Firestore Database is enabled (Build → Firestore Database)
- [ ] Firestore security rules are applied in Firebase Console (copy from `FIREBASE_SETUP.md`)
- [ ] Admin service account env vars are set in Vercel Production:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`
- [ ] Client SDK env vars are set in Vercel Production:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] Delete or archive **Firestore test records** before launch:
  - `checkout_sessions` test documents
  - `subscriptions` test documents
  - `customers` / `users` test documents
  - `onboarding_submissions` test documents
- [ ] Delete **Firebase Auth test users** before launch

---

## C. Vercel

- [ ] All Production env vars are set (see `FIREBASE_SETUP.md` and `EMAIL_SETUP.md`)
- [ ] Admin env vars are set in Vercel Production:
  - `MOONLIGHT_ADMIN_PIN` (numeric PIN for admin panel login)
- [ ] `NEXT_PUBLIC_APP_URL=https://moonlightwebdesigns.com` is set in Production
- [ ] Redeploy after any env var changes
- [ ] Preview env vars include test Firebase + PayPal sandbox credentials

---

## D. Email (Resend)

- [ ] `moonlightwebdesigns.com` is **verified** in Resend dashboard
- [ ] SPF record is added to DNS: `v=spf1 include:amazonses.com ~all`
- [ ] DKIM CNAME records are added to DNS (Resend provides two)
- [ ] DMARC record is added to DNS:
  ```
  _dmarc  TXT  v=DMARC1; p=none; rua=mailto:hello@moonlightwebdesigns.com
  ```
- [ ] `RESEND_API_KEY` is set in Vercel Production
- [ ] `MOONLIGHT_FROM_EMAIL=hello@moonlightwebdesigns.com` is set in Vercel Production
- [ ] `MOONLIGHT_ADMIN_EMAIL=<your-admin-email>` is set in Vercel Production
- [ ] Send a test welcome email and confirm it arrives in inbox (not spam)
- [ ] Verify SPF/DKIM/DMARC pass by checking Gmail "View original" headers
- [ ] Test with [mail-tester.com](https://www.mail-tester.com) — target score 9+

---

## E. Legal / Business

- [ ] **Terms of Service** mentions PayPal billing
- [ ] Terms mention the **12-month minimum commitment**
- [ ] Terms clearly state that cancelling PayPal does **not** waive the minimum commitment
- [ ] **Pricing page** shows 12-month minimum copy visible to customers
- [ ] Contact email on public pages is `hello@moonlightwebdesigns.com`

---

## F. Admin Panel

- [ ] `MOONLIGHT_ADMIN_PIN` is set to a strong numeric PIN in Vercel Production
- [ ] `/admin/login` is accessible and PIN login works
- [ ] Admin dashboard loads and shows subscription/onboarding counts
- [ ] Subscription table loads and links to detail pages
- [ ] Onboarding list loads
- [ ] Onboarding detail "Mark as reviewed" works
- [ ] Admin logout clears session and redirects to login
- [ ] Non-admin users are redirected from `/admin` to `/admin/login`

---

## G. Full QA Checklist

- [ ] Standard plan checkout flow: checkout → PayPal → `/thank-you`
- [ ] Advanced plan checkout flow: checkout → PayPal → `/thank-you`
- [ ] PayPal webhook fires on subscription activation (`BILLING.SUBSCRIPTION.ACTIVATED`)
- [ ] Welcome email sent to client after activation
- [ ] Internal notification email sent to admin after activation
- [ ] Firestore `subscriptions` record created with correct plan/price/dates
- [ ] Client portal login: request magic link → receive email → click link → dashboard loads
- [ ] Portal shows correct subscription status (active/cancelled/etc.)
- [ ] Portal onboarding card shows correct status (Pending/Submitted/Reviewed)
- [ ] Onboarding form: submit all required fields → success state
- [ ] Onboarding submission: admin receives notification email
- [ ] Client receives onboarding confirmation email
- [ ] Admin dashboard: new submission appears in onboarding list
- [ ] Admin can mark onboarding as reviewed → portal updates to "Reviewed"
- [ ] Duplicate PayPal webhook events do not resend emails or create duplicate records
- [ ] Mobile layout: portal, checkout, thank-you, admin all usable on mobile
- [ ] No console errors or uncaught exceptions in production build

---

## H. Data Cleanup Before Launch

- [ ] Cancel any sandbox/test PayPal subscriptions via PayPal dashboard
- [ ] Delete Firestore test documents (or move to a `_test` collection)
- [ ] Delete Firebase Auth test users
- [ ] Confirm no personal email addresses are hardcoded as customer contacts in production

---

## I. Architecture Notes

| Concern | Where it's handled |
|---|---|
| Subscription activation | PayPal webhook is the **source of truth** — not `/thank-you` |
| Client portal data | Server-side via `GET /api/portal/me` (Admin SDK, ID token verified) |
| Onboarding data | Server-side via `GET/POST /api/portal/onboarding` (Admin SDK) |
| Admin panel | Protected by PIN session cookie; all data via Firestore Admin SDK |
| Webhook deduplication | `paypal_events` collection — deduped by PayPal event ID |
| Email idempotency | `welcomeEmailSentAt` / `internalNotificationSentAt` fields on subscriptions |
| Secret exposure | Admin PIN and Firebase private key are server-only; never in client bundles |

---

> **TODO (future PR):** Add Redis-backed rate limiting for `/api/admin/login` (current in-memory limiter resets on cold start).
> **TODO (future PR):** Upgrade DMARC policy from `p=none` to `p=quarantine` once email deliverability is verified.
> **TODO (future PR):** Consider Firebase Admin phone SMS auth for stronger admin authentication.
