import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBPwcxkZbZFAcGgkoWg1BEC5lL4F4y-R7s",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "irishpub-2a7fe.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "irishpub-2a7fe",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "irishpub-2a7fe.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "471240756778",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:471240756778:web:e08f313c071f579671fd53",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-RL0G65G410"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
