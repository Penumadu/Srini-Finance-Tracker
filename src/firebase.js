import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-ZgPAsvXZCuH7rjihMo6U4-gj7EF7EhQ",
  authDomain: "finance-tracker-ef802.firebaseapp.com",
  projectId: "finance-tracker-ef802",
  storageBucket: "finance-tracker-ef802.firebasestorage.app",
  messagingSenderId: "460270036271",
  appId: "1:460270036271:web:5a4c9991a02efdb7ccadda",
  measurementId: "G-72YG9RJG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
