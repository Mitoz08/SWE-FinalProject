import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
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
                <TouchableOpacity 
                    style= {styles.button}
                    onPress={() => {VerifyLogin(Email,Password).then((res) => {res ? setIsLoggedIn(true):setIsLoggedIn(false)})}}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.button}
                    onPress={() => {navigation.navigate("I_SignUp")}}>
                    <Text>New user? Sign up here</Text>
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
        margin: 5,
        padding: 10,
        backgroundColor: "lightblue",
        width: 100,
        borderWidth: 1,
    },
  });