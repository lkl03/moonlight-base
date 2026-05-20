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
4. Enable the sign-in providers you need (e.g. **Email/Password** for the client portal).

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

The following collections are defined in `src/lib/firebase/schema.ts` and will be populated by future PRs:

| Collection | Description |
|---|---|
| `checkout_sessions` | Stores checkout intent, plan choice, and accepted terms before PayPal redirect |
| `users` | Firebase Auth user profiles (uid, email, name, role) |
| `customers` | PayPal payer details linked to a user |
| `subscriptions` | Active and historical subscription records |
| `paypal_events` | Raw PayPal webhook event payloads for auditability |

---

## Suggested Firestore security rules

These rules are not yet deployed — they document the intended access model for when Firebase Auth is wired up in a future PR.

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

---

## What future PRs will add

- **Firebase Auth integration** — sign-in for the `/portal` route using email/password.
- **Checkout session writes** — the PayPal modal will write a `checkout_sessions` document before redirecting to PayPal.
- **Webhook Firestore writes** — the PayPal webhook handler will create/update `subscriptions`, `customers`, and `paypal_events` documents via the Admin SDK.
- **Client portal** — authenticated `/portal` pages for viewing subscription status, onboarding steps, and billing details.
- **Transactional emails** — triggered on `BILLING.SUBSCRIPTION.ACTIVATED` to confirm plan, price, and 12-month minimum commitment.
