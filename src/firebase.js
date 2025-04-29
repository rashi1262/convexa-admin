// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1fqBllSaxfGKRZrsjFYhssyiz1Wy1oTI",
    authDomain: "convexa-ai.firebaseapp.com",
    projectId: "convexa-ai",
    storageBucket: "convexa-ai.firebasestorage.app",
    messagingSenderId: "899008296692",
    appId: "1:899008296692:web:3be182709d9a8b3b5190a1",
    measurementId: "G-8QTKFVG0LH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
