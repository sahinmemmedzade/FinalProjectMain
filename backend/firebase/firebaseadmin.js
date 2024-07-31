// Initialize Firebase Admin SDK in a separate file (e.g., firebaseAdmin.js)
import admin from 'firebase-admin';
import serviceAccount from './path/to/your-service-account-file.json'; // Replace with the path to your service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
