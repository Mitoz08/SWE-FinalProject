import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";
import { VerifySignUp } from "./controller/authenticationControl";

//AuB1
function PasswordValidation(Password1, Password2) {
    const result = (Password1 === Password2) ? 1 : 0;
    return result
}

//AuB2
function PasswordChecker(Password) {
    //Driver Code Starts{
    const levels = {
        1: "Very Weak",
        2: "Weak",
        3: "Medium",
        4: "Strong",
    };

    if (Password.length > 15) {
        alert(Password + " - Too lengthy");
        return(false);
    } else if (Password.length < 8) {
        alert(Password + " - Too short");
        return(false);
    }

    const checks = [
        /[a-z]/,     // Lowercase
        /[A-Z]/,     // Uppercase
        /\d/,        // Digit
        /[@.#$!%^&*.?]/ // Special character
    ];
    let score = checks.reduce((acc, rgx) => acc + rgx.test(Password), 0);

    console.log(Password + " - " + levels[score]);

    if(score < 4){
        return false;
    }
    return true;
}

// You can put all the method calls in this function or just put it in the onPress arrow function
async function OnSignUp(FirstName, LastName, Phone, Email, Password, ConfirmPassword) {
    
    //AuB1,
    if(PasswordValidation(Password, ConfirmPassword)){
        //AuB2
        if(PasswordChecker(Password)){
            //AuC2
            console.log("In Password Checker")
            if(await VerifySignUp(FirstName, LastName, Phone, Email, Password)){
                console.log("Sign Up Successful")
                return true
            } else {
                console.log("Sign Up Unsuccessful")
            }
        }
    }
    
    return false;
}

export default function I_SignUp({navigation}) {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const {setIsLoggedIn} = useContext(AuthContext)
    
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../../assets/carpark_logo.png')}
                    style={styles.logo}/>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={FirstName}
                    placeholder="First Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={LastName}
                    placeholder="Last Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone}
                    value={Phone}
                    placeholder="Phone No."
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={Email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={Password}
                    placeholder="Password"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={ConfirmPassword}
                    placeholder="Confirm Password"
                />
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {OnSignUp(FirstName, LastName, Phone, Email,Password,ConfirmPassword).then((res) => {res? setIsLoggedIn(true) : setIsLoggedIn(false)})}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {navigation.navigate("I_Login")}}>
                    <Text style={styles.buttonText}>Login here</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

    logo: {
        width: 300, // Adjust width as needed
        height: 300, // Adjust height as needed
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingVertical: 20, // Match the button's vertical padding
        paddingHorizontal: 10, // Match the button's horizontal padding
        borderRadius: 10,
        textAlign: "left",
    },
    button: {
        margin: 10,
        paddingVertical: 20, // Increased padding for larger buttons
        paddingHorizontal: 15, // Increased padding for larger buttons
        backgroundColor: "#4682b4",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
  });
