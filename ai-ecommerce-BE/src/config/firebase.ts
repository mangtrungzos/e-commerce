import admin from 'firebase-admin';
import * as serviceAccount from '../firebase/ai-ecommerce-de56e-firebase-adminsdk-fbsvc-df3077cefb.json';

const serviceAccountTyped = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountTyped)
});

export default admin;


