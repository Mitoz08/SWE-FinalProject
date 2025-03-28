import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/Ionicons"




export default function I_PaymentUI({navigation}) {

    const intervalTime = 30 
    const [interval, setInterval] = useState(1)
    const [max, setMax] = useState(false)
    const [min, setMin] = useState(false)

    
    const increase = () => {
        if (interval >= 48) {
            setMax(true)
            return false
        }
        else {
            setMin(false)
            setInterval(interval + 1)
            return true
        }
    }

    const decrease = () => {
        if (interval == 1) {
            setMin(true)
            return false
        }
        else {
            setMax(false)
            setInterval(interval - 1)
            return true
        }
    }

    const showTime = () => {
        hour = Math.floor((interval*intervalTime)/60)
        mins = (interval*intervalTime)%60
        return `${hour} Hr${hour > 1? "s":""} ${mins == 0? "00":mins} Mins`
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <AntDesign name="remove-circle" size={100} onPress={decrease} />
                <Text>{showTime()}</Text>
                <AntDesign name="add-circle" size={100} onPress={increase} />
                <Text style= {styles.error_msg}>{min? "Minimun duration is 30 mins": max? "Maximun duration is 24 hours": ""}</Text>


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
    error_msg: {
        color: "#F00"
    }
  });