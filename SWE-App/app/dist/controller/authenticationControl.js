import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {AddNewUser, GetUserID, AddUserInfo} from "./databaseControl";
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

const auth = getAuth();


export function VerifyLogin(Email, Password) {
    let valid = false;
    //FC1
    signInWithEmailAndPassword(auth, Email, Password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user = userCredential.user;
        const firebaseId = user.uid;
        //DC2
        const userId = GetUserID(firebaseId);
        //MC1
        InitialiseUser(userId);
        valid = true;
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


export function VerifySignUp(FirstName, LastName, Phone, Email, Password) {
    let valid = false;
    //FC2
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const firebaseId = user.uid;
        //DC1
        const userId = AddNewUser(firebaseId);
        //DC6
        AddUserInfo(userId, Email, FirstName, LastName, Phone)
        //MC1
        InitialiseUser(userId);
        valid = true;
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
