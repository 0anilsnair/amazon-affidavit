import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDj35PuVMMVx71Adw0BOiiKQhlyP1yHKuo",
  authDomain: "affidavit-23b0b.firebaseapp.com",
  projectId: "affidavit-23b0b",
  storageBucket: "affidavit-23b0b.firebasestorage.app",
  messagingSenderId: "548679086579",
  appId: "1:548679086579:web:a1a8c0de6f80565cfee286",
  measurementId: "G-EM21GWXV65"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics(app);

const auth = getAuth(app);

export { db, analytics, auth };


