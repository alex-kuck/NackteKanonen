import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

const app = initializeApp(config);
export const db = getDatabase(app);
