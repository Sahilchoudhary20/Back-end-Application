import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'serviceAccountKey.json');

if (fs.existsSync(keyPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  console.log('Firebase initialized');
} else {
  console.warn('Firebase service account not found at', keyPath);
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export default admin;
