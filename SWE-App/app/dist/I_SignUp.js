
import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";

//AuB1
function PasswordValidation(Password) {
    // Example validation: Password must be at least 8 characters long
    return Password.length >= 8;
}

//AuB2
function PasswordChecker(Password, ConfirmPassword) {
    // Check if password and confirm password match
    return Password === ConfirmPassword;
}

// You can put all the method calls in this function or just put it in the onPress arrow function
function OnSignUp(Email, Password, ConfirmPassword) {
    //AuB1,
    //AuB2,
    //AuC2

    // Validate password and confirm password
    if (!PasswordValidation(Password)) {
        alert("Password must be at least 8 characters long.");
        return false;
    }
    if (!PasswordChecker(Password, ConfirmPassword)) {
        alert("Passwords do not match.");
        return false;
    }

    // Returns true if sign up is successful to toggle main page
    return true;
}

export default function I_SignUp({navigation}) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const {setIsLoggedIn} = useContext(AuthContext)
    
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../../assets/carpark_logo.png')}
                    style={styles.logo}
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
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={ConfirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {OnSignUp(Email,Password,ConfirmPassword)? setIsLoggedIn(true) : setIsLoggedIn(false)}}>
                    <Text style={styles.buttonText}> Sign Up</Text>
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
        height: 80, // Match the button's height
        margin: 10, // Match the button's margin
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
        fontSize: 18, // Increased font size for better readability
        fontWeight: "bold",
        textAlign: "center",
    },
});
