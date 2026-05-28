import admin from "firebase-admin";

let app = null;

export function getFirebaseApp() {
  if (app) return app;

  const hasCredentials =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

  if (!hasCredentials) return null;

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });

  return app;
}

export function getDb() {
  const firebaseApp = getFirebaseApp();
  return firebaseApp ? admin.firestore() : null;
}

