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

const adminApp = getAdminApp();

export const adminAuth = admin.auth(adminApp);
export const adminDb = admin.firestore(adminApp);
