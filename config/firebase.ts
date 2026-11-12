import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../serviceAccountKey.json';

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  });
}

const db = getFirestore();

export { FieldValue };
export default db;