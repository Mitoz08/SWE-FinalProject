import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import mainControl from "./mainControl";
const firebaseConfig = {
    apiKey: "AIzaSyCZ8d70lgoVj-RgxMqskNHeAiMalBXNO78",
    authDomain: "my-expo-app-aa62e.firebaseapp.com",
    projectId: "my-expo-app-aa62e",
    storageBucket: "my-expo-app-aa62e.firebasestorage.app",
    messagingSenderId: "118705503114",
    appId: "1:118705503114:web:e429be09cb899d9ddaa673"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export async function VerifyLogin(Email, Password) {
    let user;
    let firebaseId;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
        user = userCredential.user;
        firebaseId = user.uid;
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                alert('Incorrect Email or Password');
                return false;
            }
            else {
                alert('Account Does Not Exist');
                return false;
            }
        }
        else {
            alert('An unknown error occurred.');
            return false;
        }
    }
    try {
        const res = await fetch(`http://localhost:3000/UserID?userFirebaseID=${firebaseId}`, { method: "GET" });
        const { userID } = await res.json();
        mainControl.InitialiseUser(userID);
        return true;
    }
    catch (error) {
        console.log(error);
    }
}
export async function VerifySignUp(FirstName, LastName, Phone, Email, Password) {
    let user;
    let firebaseId;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
        user = userCredential.user;
        firebaseId = user.uid;
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert('Email Address Already In Use!');
                return false;
            }
            else {
                alert('Unable to create User.');
                return false;
            }
        }
        else {
            alert('An unknown error occurred.');
            return false;
        }
    }
    let object;
    try {
        const res = await fetch(`http://localhost:3000/UserID`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userFirebaseID: firebaseId })
        });
        const { userID } = await res.json();
        object = {
            userID: userID,
            userEmail: Email,
            firstName: FirstName,
            lastName: LastName,
            userPhoneNo: Phone
        };
        const res1 = await fetch(`http://localhost:3000/UserInfo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
        const data = await res1.json();
        if (!data.userInfo) {
            throw new Error("Fail to add user information");
        }
        else {
            console.log("Initialising user");
            mainControl.InitialiseUser(object.userID);
            return true;
        }
    }
    catch (error) {
        console.log(error);
    }
}
