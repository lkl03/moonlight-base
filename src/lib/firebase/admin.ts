import * as admin from 'firebase-admin';

function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) return admin.app();

  // Vercel stores the private key with literal \n characters; replace them so
  // the PEM block is valid at runtime.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

// Lazy getters — the Admin SDK is only initialised on first call,
// not at module load time. This prevents build-time errors when
// FIREBASE_* env vars are absent (e.g. during `next build`).
export function getAdminDb(): admin.firestore.Firestore {
  return admin.firestore(getAdminApp());
}

export function getAdminAuth(): admin.auth.Auth {
  return admin.auth(getAdminApp());
}
