import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";

//AuB1
function PasswordValidation(Password) {
    
}

//AuB2
function PasswordChecker(Password) {

}

// You can put all the method calls in this function or just put it in the onPress arrow function
function OnSignUp(Email,Password,ConfirmPassword) {
    //AuB1,
    //AuB2,
    //AuC2

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
            <SafeAreaView>
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
                    onPress={() => {OnSignUp(Email,Password,ConfirmPassword)? setIsLoggedIn(true) : setIsLoggedIn(false)}}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {navigation.navigate("I_Login")}}>
                    <Text>Login here</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
  });