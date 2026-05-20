# Firebase Setup

This document explains how Firebase is integrated into Moonlight Web Designs and what must be configured before Firebase-dependent features work.

---

## Environment variables

All Firebase values are read from environment variables at runtime. **No real credentials are committed to this repository.**

Create a `.env.local` file locally (it is git-ignored) and add the following:

```env
# Firebase client SDK — public, safe to expose in the browser
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK — server only, never expose to the browser
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

> **Never commit `.env.local` or any file containing real credentials.**
> The `.gitignore` ignores `.env`, `.env.local`, and all `.env*.local` variants.

### Private key newline handling

When you copy the private key from the JSON service account file, it contains literal `\n` escape sequences. These must remain as `\n` (not actual newlines) when stored in Vercel Environment Variables — the code in `src/lib/firebase/admin.ts` converts them at runtime using `.replace(/\\n/g, '\n')`.

In `.env.local` wrap the entire value in double quotes:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
```

**Private env vars (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) must never be imported into client components.** They are only available in Server Components, Route Handlers, and Server Actions. The Admin SDK helper at `src/lib/firebase/admin.ts` must only ever be imported from server-side files.

### Configuring in Vercel

Go to **Vercel Dashboard → Project → Settings → Environment Variables** and add each variable:

| Variable | Environment |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Production, Preview, Development |
| `FIREBASE_PROJECT_ID` | Production (+ Preview/Development for server-side testing) |
| `FIREBASE_CLIENT_EMAIL` | Production (+ Preview/Development for server-side testing) |
| `FIREBASE_PRIVATE_KEY` | Production (+ Preview/Development for server-side testing) |

---

## Firebase project setup

### 1. Create the Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com).
2. Click **Add project** and follow the wizard.
3. Disable Google Analytics if not needed.

### 2. Enable Firebase Authentication

1. In the Firebase Console, open your project.
2. Navigate to **Build → Authentication**.
3. Click **Get started**.
4. Under **Sign-in method**, enable **Email/Password**.
5. Inside the Email/Password provider, also enable the **Email link (passwordless sign-in)** sub-option — this is required for the client portal magic link flow.

#### Authorized domains

The portal uses Firebase email link sign-in with `handleCodeInApp: true`, which means the magic link redirects directly to your app URL. Firebase will only allow redirects to domains listed under **Authentication → Settings → Authorized domains**.

Add `moonlightwebdesigns.com` to the authorized domains list. `localhost` is included by default for local development.

> **Without this step**, magic links will fail with an "unauthorized domain" error when clicked.

### 3. Enable Firestore

1. Navigate to **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Production mode** (start with strict rules, then refine).
4. Select the region closest to your users.

### 4. Add a Web App and copy the config

1. Navigate to **Project Overview → Project settings**.
2. Under **Your apps**, click the **Web** icon (`</>`).
3. Register the app (e.g. `moonlight-web`).
4. Copy the `firebaseConfig` object — these values map directly to the `NEXT_PUBLIC_FIREBASE_*` env vars above.

### 5. Create a Firebase Admin service account

1. Navigate to **Project settings → Service accounts**.
2. Click **Generate new private key**.
3. Download the JSON file — **keep it secret, never commit it**.
4. From the JSON file, copy:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (see newline handling above)

---

## Firestore collections

All collections are defined in `src/lib/firebase/schema.ts`. The schema type names map to `COLLECTIONS` constants in that file.

### `checkout_sessions`

Created by `POST /api/checkout/session` when a user starts the PayPal checkout flow. Updated by `PATCH /api/checkout/session` on PayPal approval and by the webhook handler on subscription activation.

| Field | Type | Description |
|---|---|---|
| `id` | string | Firestore document ID |
| `planName` | string | Human-readable plan name |
| `paypalPlanId` | string | PayPal plan ID |
| `planPrice` | number | Monthly price (server-authoritative) |
| `currency` | string | Currency code (e.g. `USD`) |
| `clientName` | string | Name entered by the user in the checkout form |
| `clientEmail` | string | Email entered by the user |
| `acceptedTerms` | boolean | Whether Terms of Service were accepted |
| `acceptedTermsAt` | Timestamp \| null | When terms were accepted |
| `acceptedMinimumCommitment` | boolean | Whether 12-month commitment was acknowledged |
| `acceptedMinimumCommitmentAt` | Timestamp \| null | When commitment was acknowledged |
| `minimumCommitmentMonths` | number | Always `12` |
| `status` | string | `pending` → `paypal_approved` → `active` \| `cancelled` \| `expired` |
| `paypalSubscriptionId` | string \| null | Set on PayPal approval |
| `approvedAt` | Timestamp | Set when PayPal returns `subscriptionID` in `onApprove` |
| `activatedAt` | Timestamp | Set by `BILLING.SUBSCRIPTION.ACTIVATED` webhook |
| `minimumCommitmentEndAt` | Timestamp | `activatedAt + 12 months` |
| `welcomeEmailSentAt` | Timestamp | Set after welcome email is sent (idempotency guard) |
| `internalNotificationSentAt` | Timestamp | Set after internal notification is sent |
| `createdAt` | Timestamp | Document creation time |
| `updatedAt` | Timestamp | Last update time |

### `users`

Firebase Auth user profiles. Created on first sign-in or on subscription activation (as a placeholder record).

| Field | Type | Description |
|---|---|---|
| `uid` | string | Firebase Auth UID |
| `email` | string | User email |
| `name` | string | Display name |
| `role` | string | `client` or `admin` |
| `createdAt` | Timestamp | |
| `updatedAt` | Timestamp | |

### `customers`

PayPal payer details, linked to a user record. Created by the `BILLING.SUBSCRIPTION.ACTIVATED` webhook handler.

| Field | Type | Description |
|---|---|---|
| `id` | string | Firestore document ID |
| `userId` | string | References `users/{uid}` |
| `email` | string | Customer email |
| `name` | string | Customer name |
| `paypalPayerId` | string \| null | PayPal payer ID from webhook resource |
| `paypalEmail` | string \| null | PayPal account email from webhook resource |
| `createdAt` | Timestamp | |
| `updatedAt` | Timestamp | |

### `subscriptions`

Subscription records, created by the `BILLING.SUBSCRIPTION.ACTIVATED` webhook handler. Updated by subsequent billing and cancellation events.

| Field | Type | Description |
|---|---|---|
| `id` | string | Firestore document ID |
| `userId` | string \| null | References `users/{uid}` |
| `customerId` | string \| null | References `customers/{id}` |
| `paypalSubscriptionId` | string | PayPal subscription ID |
| `paypalPlanId` | string \| null | PayPal plan ID |
| `planName` | string | Human-readable plan name |
| `monthlyPrice` | number | Monthly price |
| `currency` | string | Currency code |
| `status` | string | `active` \| `cancelled` \| `expired` \| `suspended` |
| `startedAt` | Timestamp | Subscription start time from PayPal |
| `minimumCommitmentMonths` | number | Always `12` |
| `minimumCommitmentEndAt` | Timestamp | `startedAt + 12 months` |
| `acceptedTermsAt` | Timestamp \| null | From checkout session |
| `acceptedMinimumCommitmentAt` | Timestamp \| null | From checkout session |
| `lastPaymentAt` | Timestamp \| null | Set by `PAYMENT.SALE.COMPLETED` |
| `lastPaymentAmount` | string \| null | Set by `PAYMENT.SALE.COMPLETED` |
| `lastPaymentCurrency` | string \| null | Set by `PAYMENT.SALE.COMPLETED` |
| `lastPaymentStatus` | string \| null | Set by `PAYMENT.SALE.COMPLETED` |
| `cancelledAt` | Timestamp \| null | Set by `BILLING.SUBSCRIPTION.CANCELLED` |
| `earlyCancelledWithRemainingCommitment` | boolean | `true` if cancelled before `minimumCommitmentEndAt` |
| `checkoutSessionId` | string \| null | Back-reference to originating `checkout_sessions` doc |
| `welcomeEmailSentAt` | Timestamp \| null | Idempotency guard for welcome email |
| `internalNotificationSentAt` | Timestamp \| null | Idempotency guard for internal notification |
| `createdAt` | Timestamp | |
| `updatedAt` | Timestamp | |

### `onboarding_submissions`

Created by `POST /api/portal/onboarding` when a client submits the onboarding form. Updated on resubmission.

| Field | Type | Description |
|---|---|---|
| `id` | string | Firestore document ID |
| `clientEmail` | string | Authenticated client email |
| `clientName` | string | Client display name |
| `subscriptionId` | string \| null | References `subscriptions/{id}` |
| `customerId` | string \| null | References `customers/{id}` |
| `businessName` | string | Business name |
| `businessIndustry` | string | Industry category |
| `businessDescription` | string | Description of the business |
| `primaryGoal` | string | Primary goal for the website |
| `targetAudience` | string | Description of target customers |
| `desiredPages` | string[] | List of page names requested |
| `hasExistingWebsite` | boolean | Whether the client has an existing site |
| `existingWebsiteUrl` | string | URL of existing site (if any) |
| `brandColors` | string | Brand colour description |
| `brandFonts` | string | Brand font description |
| `designNotes` | string | Freeform design preferences |
| `providingOwnContent` | boolean | Whether client provides copy/images |
| `contentNotes` | string | Content-related notes |
| `inspirationUrls` | string | Websites the client likes |
| `desiredFeatures` | string[] | List of feature names requested |
| `launchTimeline` | string | Desired launch timeframe |
| `additionalNotes` | string | Any other requirements |
| `status` | string | `submitted` \| `reviewed` |
| `reviewedAt` | Timestamp \| null | Set when admin marks as reviewed |
| `createdAt` | Timestamp | Document creation time |
| `updatedAt` | Timestamp | Last update time |

When a submission is created or updated, the corresponding `subscriptions` document is updated with:
- `onboardingStatus`: `'not_started'` → `'submitted'` (admin can manually set to `'reviewed'`)
- `onboardingSubmittedAt`: timestamp of submission

### `paypal_events`

Raw PayPal webhook event payloads stored for auditability and idempotency. Every inbound webhook is stored here before processing begins.

| Field | Type | Description |
|---|---|---|
| `id` | string | Firestore document ID |
| `paypalEventId` | string | PayPal's event ID (used for deduplication) |
| `eventType` | string | e.g. `BILLING.SUBSCRIPTION.ACTIVATED` |
| `paypalSubscriptionId` | string \| null | From `resource.id` in the webhook payload |
| `paypalPlanId` | string \| null | From `resource.plan_id` in the webhook payload |
| `payload` | object | Full raw webhook payload |
| `receivedAt` | Timestamp | When the event was received |

---

## Suggested Firestore security rules

These rules document the intended access model for when Firebase Auth is wired up for the client portal.

```firestore-rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read and write their own profile only.
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Clients can read their own customer record; writes are server-side only.
    match /customers/{customerId} {
      allow read: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow write: if false;
    }

    // Clients can read their own subscriptions; status writes are server-side only.
    // Subscription records are created and updated exclusively by the Admin SDK
    // (PayPal webhook handler), never by the client.
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow write: if false;
    }

    // Checkout sessions: clients can create their own; reads are server-side only.
    match /checkout_sessions/{sessionId} {
      allow create: if request.auth != null
        && request.resource.data.clientEmail == request.auth.token.email;
      allow read, update, delete: if false;
    }

    // Onboarding submissions: clients can read/create their own; updates and reads are server-side.
    match /onboarding_submissions/{submissionId} {
      allow read: if request.auth != null
        && resource.data.clientEmail == request.auth.token.email;
      allow write: if false;
    }

    // PayPal events are written and read exclusively by the Admin SDK.
    match /paypal_events/{eventId} {
      allow read, write: if false;
    }
  }
}
```

**Key rules principles:**

- Clients can read only their own data (matched by `request.auth.uid`).
- Clients cannot directly write subscription status — that is handled exclusively by the PayPal webhook handler via the Admin SDK, which bypasses security rules.
- PayPal webhook events (`paypal_events`) are write-only from the server; no client access.
- Admin roles can be granted later using Firebase Custom Claims (e.g. `request.auth.token.admin == true`).

> **Portal data access note:** The client portal (`/portal`) does **not** use client-side Firestore queries. All subscription data is returned by `GET /api/portal/me`, a server-side route that verifies the Firebase ID token and queries Firestore via the Admin SDK. This means the Firestore security rules above are not exercised by the portal — the Admin SDK bypasses them. The rules above protect against any future direct client-side Firestore access.

---

## Client portal environment variables

Add these to Vercel in addition to the existing Firebase vars:

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Base URL for magic link `continueUrl` | `https://moonlightwebdesigns.com` |

`NEXT_PUBLIC_APP_URL` must be set to the correct URL in each Vercel environment:

| Vercel environment | Value |
|---|---|
| Production | `https://moonlightwebdesigns.com` |
| Preview | `https://your-preview-url.vercel.app` (or omit to use production URL as default) |
| Development | `http://localhost:3000` |

If `NEXT_PUBLIC_APP_URL` is not set, the magic link `continueUrl` defaults to `https://moonlightwebdesigns.com/portal`, which is correct for production.

---

## What future PRs will add

- **Admin panel** — admin-only view for managing clients, viewing all subscriptions, marking onboarding submissions as reviewed, and triggering manual actions.
