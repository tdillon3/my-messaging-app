// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase config object
  apiKey: "AIzaSyCc5Oa6hUZbITyyYTLnVtvH7uqKHYHxjkY",
  authDomain: "my-messging-app.firebaseapp.com",
  projectId: "my-messging-app",
  storageBucket: "my-messging-app.appspot.com",
  messagingSenderId: "770166118660",
  appId: "1:770166118660:web:20bc3b3983d4a23a0c5851",
  measurementId: "G-NX0NWGEVDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances for auth and database
export const auth = getAuth(app);
export const database = getDatabase(app);