import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBPwcxkZbZFAcGgkoWg1BEC5lL4F4y-R7s",
  authDomain: "irishpub-2a7fe.firebaseapp.com",
  projectId: "irishpub-2a7fe",
  storageBucket: "irishpub-2a7fe.firebasestorage.app",
  messagingSenderId: "471240756778",
  appId: "1:471240756778:web:e08f313c071f579671fd53",
  measurementId: "G-RL0G65G410"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
