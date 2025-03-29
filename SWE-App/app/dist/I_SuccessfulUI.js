import React, { useEffect, useState } from "react";
import { Text, Button, StyleSheet, LinearGradient, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { mainEntity } from "./entity/mainEntity";
import { add, format } from "date-fns";

export default function I_SuccessfulUI({navigation}) {
    const ticket = mainEntity.getTicket()
    const [address, setAddress] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3000/CarparkAddress?carparkID=${ticket.parkingLotID}`)
          .then(response => response.json())
          .then(data => setAddress(data.carparkAddress))
          .catch(error => setAddress("Error fetching address"));
      }, [ticket.parkingLotID]);

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.card}>
                    <Text style={styles.ticketID}>Ticket ID: {ticket.ticketID}</Text>
                    <Text style={styles.detail}>Parking Lot: <Text style={styles.bold}>{ticket.parkingLotID}</Text></Text>
                    <Text style={styles.detail}>Address: <Text style={styles.bold}>{address}</Text></Text>
                    <Text style={styles.detail}>License Plate: <Text style={styles.bold}>{ticket.licensePlate}</Text></Text>
                    <Text style={styles.detail}>Start Time: <Text style={styles.bold}>{format(ticket.ticketStartTime, "PPpp")}</Text></Text>
                    <Text style={styles.detail}>End Time: <Text style={styles.bold}>{format(ticket.ticketEndTime, "PPpp")}</Text></Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f3f4f6",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
      marginBottom: 16,
    },
    gradientContainer: {
      padding: 8,
      margin: 8,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    card: {
      padding: 16,
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    ticketID: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    detail: {
      fontSize: 14,
      color: "#555",
      marginTop: 4,
    },
    bold: {
      fontWeight: "600",
      color: "#222",
    },
  });