import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
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


export function VerifyLogin(Email:string, Password:string) {
    let valid = false;
    //FC1
    signInWithEmailAndPassword(auth, Email, Password)
    .then(async (userCredential)=>{
        // showMessage('login is successful', 'signInMessage');
        const user = userCredential.user;
        const firebaseId = user.uid;
        //DC2
        fetch(`http://localhost:3000/UserID?userFirebaseID=${firebaseId}`, {method: "GET"}).then(res => res.json()).then(
            (data) => {
                const {userID} = data;
                //MC1
                InitialiseUser(userID as number);
                valid = true;
            }
        ).catch((error) => {
            console.error(error);
        })

    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert('Incorrect Email or Password');
        }
        else{
            alert('Account Does Not Exist');
        }
    })


    return valid;
}


export function VerifySignUp(FirstName:string, LastName:string, Phone:string, Email:string, Password:string) {
    let valid = false;
    //FC2
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const firebaseId = user.uid;
        //DC1
        fetch(`http://localhost:3000/UserID`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(firebaseId)}).then(res => res.json()).then((data)=>{
                const {userId} = data; 

                //DC6

                const object = {
                    userID: userId,
                    userEmail: Email,
                    firstName: FirstName,
                    lastName: LastName,
                    userPhoneNo: Phone
                }

                fetch(`http://localhost:3000/UserInfo`,{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(object)}).then(res => res.json()).then((data) => {
                        if (!data.userInfo){
                            throw new Error("Fail to add user information")
                        } else {
                            //MC1
                            InitialiseUser(userId);
                            valid = true;
                        }
                    })

            }).catch((error) =>console.log(error))
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            alert('Email Address Already In Use!');
        }
        else{
            alert('Unable to create User.');
        }
    })

    return valid;
}