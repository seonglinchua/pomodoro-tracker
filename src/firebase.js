// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl5y56EUkoJ3D9Q1sVQ8JF-skh-zV845I",
  authDomain: "pomodoro-tracker-e60d8.firebaseapp.com",
  projectId: "pomodoro-tracker-e60d8",
  storageBucket: "pomodoro-tracker-e60d8.firebasestorage.app",
  messagingSenderId: "400914750063",
  appId: "1:400914750063:web:40e301015100506c910b9a",
  measurementId: "G-J4KEH5Q0QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
