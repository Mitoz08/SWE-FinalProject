import React, {useContext} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";

export default function I_MainPage({navigation}) {
    const {setIsLoggedIn} = useContext(AuthContext)
    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {navigation.navigate("I_InputVehDetail")}}>
                    <Text>Availability</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {}}>
                    <Text>ViewTickets</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {}}>
                    <Text>ViewProfile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {setIsLoggedIn(false)}}>
                    <Text>Logout</Text>
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