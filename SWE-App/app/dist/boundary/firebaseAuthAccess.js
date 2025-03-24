import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export const SignUpMethod = (Email, Password) => {
    const firebaseID = createUserWithEmailAndPassword(auth, Email, Password).then((userCredential) => {
        return userCredential.user.uid;
    });
    return firebaseID;
};
export const SignInMethod = (Email, Password) => {
    const firebaseID = signInWithEmailAndPassword(auth, Email, Password).then((userCredential) => {
        return userCredential.user.uid;
    });
    return firebaseID;
};
