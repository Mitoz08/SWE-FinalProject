import React, {useContext} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";

export default function I_MainPage({navigation}) {
    const {setIsLoggedIn} = useContext(AuthContext)
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {navigation.navigate("I_Availability")}}>
                    <Text style={styles.buttonText}>Availability</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {navigation.navigate("I_ViewTickets")}}>
                    <Text style={styles.buttonText}>View Tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {}}>
                    <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {setIsLoggedIn(false)}}>
                    <Text style={styles.buttonText}>Logout</Text>
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
        backgroundColor: '#f0f8ff',
    },
    button: {
        margin: 10,
        paddingVertical: 20, // Increased padding for larger buttons
        paddingHorizontal: 30, // Increased padding for larger buttons
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