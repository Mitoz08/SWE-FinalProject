
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/Ionicons";
import { ProcessPayment } from "./controller/paymentControl";

export default function I_PaymentUI({ navigation, route }) {
    const { licensePlate, carparkType, carparkID, rate } = route.params;

    const intervalTime = 30;
    const [interval, setInterval] = useState(1);
    const [max, setMax] = useState(false);
    const [min, setMin] = useState(false);
    const [paymentErrorMsg, setPaymentErrorMsg] = useState("");
    const [processing, setProcessing] = useState(false)

    const increase = () => {
        if (interval >= 48) {
            setMax(true);
            return false;
        } else {
            setMin(false);
            setInterval(interval + 1);
            return true;
        }
    };

    const decrease = () => {
        if (interval === 1) {
            setMin(true);
            return false;
        } else {
            setMax(false);
            setInterval(interval - 1);
            return true;
        }
    };

    const showTime = () => {
        hour = Math.floor((interval*intervalTime)/60)
        mins = (interval*intervalTime)%60
        return `${hour} Hr${hour > 1? "s":""} ${mins == 0? "00":mins} Mins`
    }

    const showFee = () => {
        if (carparkType === "M") return rate.toFixed(2);
        else {
            const hour = Math.floor((interval * intervalTime) / 60);
            const mins = (interval * intervalTime) % 60;
            const totalFee = (hour * 2 + mins / 30) * rate;
            return Number(totalFee.toFixed(2)).toFixed(2);
        }
    };

    const handlePayment = () => {
        if (processing) return
        setProcessing(true)
        ProcessPayment({
            carparkNo: carparkID,
            rate: rate,
            licensePlate: licensePlate,
            duration_hour: Math.floor((interval * intervalTime) / 60),
            duration_min: (interval * intervalTime) % 60
        })
        .then(response => response ? navigation.navigate("I_SuccessfulUI") : setPaymentErrorMsg("Open Ticket already exists"))
        .finally(() => {setProcessing(false)});
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Image
                        source={require('../../assets/payment_logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.heading}>Parking Payment</Text>
                    <View style={styles.timeControl}>
                        <AntDesign name="remove-circle" size={50} color={"#007bff"} onPress={decrease} />
                        <Text style={styles.timeText}>{showTime()}</Text>
                        <AntDesign name="add-circle" size={50} color={"#007bff"} onPress={increase} />
                    </View>
                    <Text style={styles.errorMsg}>
                        {min ? "Minimum duration is 30 mins" : max ? "Maximum duration is 24 hours" : ""}
                    </Text>
                    <Text style={styles.feeText}> Fee: ${showFee()}</Text>
                <TouchableOpacity
                        style={[styles.payButton, processing && styles.disabledButton]}
                        onPress={handlePayment}>
                        <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
                    {paymentErrorMsg !== "" && <Text style={styles.errorMsg}>{paymentErrorMsg}</Text>}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: "90%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    timeControl: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    timeText: {
        fontSize: 20,
        marginHorizontal: 15,
        color: "#333",
    },
    errorMsg: {
        color: "#F00",
        marginTop: 10,
    },
    feeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginTop: 20,
    },
    payButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 30,
        alignItems: "center",
        width: "80%",
    },
    payButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },  
    disabledButton: {
        backgroundColor: "#cccccc",
    },
  });

