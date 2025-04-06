import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { VerifyLogin } from "../src/controller/authenticationControl";
import { AuthContext } from "./AuthContext";
export default function I_Login({navigation}){
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    
    const {setIsLoggedIn} = useContext(AuthContext)

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../../assets/carpark_logo.png')} // Update with the correct path to your logo
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
                />
                <TouchableOpacity 
                    style= {styles.button}
                    onPress={() => {VerifyLogin(Email,Password).then((res) => {res ? setIsLoggedIn(true):setIsLoggedIn(false)})}}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.button}
                    onPress={() => {navigation.navigate("I_SignUp")}}>
                    <Text style={styles.buttonText}>New user? Sign up here</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 300, // Adjust width as needed
        height: 300, // Adjust height as needed
        marginBottom: 20,
    },
    input: {
        height: 80,
        margin: 10,
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    button: {
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
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