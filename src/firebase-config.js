// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrzJrD1Brz-JKwO4pi0piUzgDkmSagiC0",
    authDomain: "elora-ex.firebaseapp.com",
    projectId: "elora-ex",
    storageBucket: "elora-ex.firebasestorage.app",
    messagingSenderId: "504245166874",
    appId: "1:504245166874:web:4ae503eb0170a7bff082a3",
    measurementId: "G-BDHXEVWPHQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);