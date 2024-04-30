// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByF6uhvc2u_N5TNAz-dQ2Q9kBGlr9rM24",
  authDomain: "codelepro.firebaseapp.com",
  projectId: "codelepro",
  storageBucket: "codelepro.appspot.com",
  messagingSenderId: "459366894901",
  appId: "1:459366894901:web:49531eee5320a9ff9dd07c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Initialize Firestore

export { app, firestore };