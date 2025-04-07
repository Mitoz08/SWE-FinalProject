import { initializeApp, FirebaseError } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User} from "firebase/auth";
import {InitialiseUser} from "./mainControl";
//import {getDatabase} from "database.js"
 
const firebaseConfig = {
    apiKey: "AIzaSyCZ8d70lgoVj-RgxMqskNHeAiMalBXNO78",
    authDomain: "my-expo-app-aa62e.firebaseapp.com",
    projectId: "my-expo-app-aa62e",
    storageBucket: "my-expo-app-aa62e.firebasestorage.app",
    messagingSenderId: "118705503114",
    appId: "1:118705503114:web:e429be09cb899d9ddaa673"
  };

const app = initializeApp(firebaseConfig)

const auth = getAuth();

type UserInfo = {
    userID: number,
    userEmail: string,
    firstName: string,
    lastName: string,
    userPhoneNo: string
} 


export async function VerifyLogin(Email:string, Password:string) {
    let user
    let firebaseId
    try {
        //FC1
        const userCredential = await signInWithEmailAndPassword(auth, Email, Password)
        user = userCredential.user
        firebaseId = user.uid;
        
    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            if (errorCode==='auth/invalid-credential') {
                alert('Incorrect Email or Password');
                return false;
            } else {
                alert('Account Does Not Exist');
                return false;
            }
        } else {
            alert('An unknown error occurred.');
            return false;
        }
    }
    try{
        //DC2
        const res = await fetch(`http://localhost:3000/UserID?userFirebaseID=${firebaseId}`, { method: "GET" })
        const {userID} = await res.json()
        InitialiseUser(userID)
        return true;
    } catch (error) {
        console.log(error)
    }
}


export async function VerifySignUp(FirstName:string, LastName:string, Phone:string, Email:string, Password:string) {
    let user
    let firebaseId
    try {
        //FC2
        const userCredential = await createUserWithEmailAndPassword(auth, Email, Password)
        user = userCredential.user
        firebaseId = user.uid;
        
    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert('Email Address Already In Use!');
                return false;
            } else {
                alert('Unable to create User.');
                return false;
            }
        } else {
            alert('An unknown error occurred.');
            return false;
        }
    }
    let object: UserInfo
    try {
        //DC1
        const res = await fetch(`http://localhost:3000/UserID`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userFirebaseID:firebaseId})
        }) 
        const {userID} = await res.json()
        object = {
            userID: userID,
            userEmail: Email,
            firstName: FirstName,
            lastName: LastName,
            userPhoneNo: Phone
        };
        //DC6
        const res1 = await fetch(`http://localhost:3000/UserInfo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })
  
        const data = await res1.json()
        if (!data.userInfo) {
            throw new Error("Fail to add user information");
        }
        else {
            console.log("Initialising user")
            InitialiseUser(object.userID);
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}