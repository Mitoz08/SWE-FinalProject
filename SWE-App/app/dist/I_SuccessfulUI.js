import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function I_SuccessfulUI({navigation}) {

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableOpacity 
                    style={styles.button}   
                    onPress={() => {navigation.navigate("I_InputVehicleDetails")}}>
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