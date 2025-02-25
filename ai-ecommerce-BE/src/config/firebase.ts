import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);
console.log(serviceAccount);
const serviceAccountTyped = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountTyped)
});

export default admin;


