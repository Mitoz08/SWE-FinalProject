import React, { useEffect, useState } from "react";
import { Text, Button, StyleSheet, LinearGradient, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import viewTicketControl from "./controller/viewTicketsControl";

export default function I_ViewTickets({navigation}) {

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      const ticket = await viewTicketControl.getTicket();
      setTicket(ticket);
    }
    fetchTicket();
  }, []);

  console.log(ticket)
  if (!ticket) return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>
            No Open Tickets
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )

  return(
      <SafeAreaProvider>
          <SafeAreaView>
              (<View style={styles.card}>
                  <Text style={styles.ticketID}>Ticket ID: {ticket.ticketID}</Text>
                  <Text style={styles.detail}>Parking Lot: <Text style={styles.bold}>{ticket.parkingLotID}</Text></Text>
                  <Text style={styles.detail}>Address: <Text style={styles.bold}>{address}</Text></Text>
                  <Text style={styles.detail}>License Plate: <Text style={styles.bold}>{ticket.licensePlate}</Text></Text>
                  <Text style={styles.detail}>Start Time: <Text style={styles.bold}>{ticket.ticketStartTime.toLocaleString()}</Text></Text>
                  <Text style={styles.detail}>End Time: <Text style={styles.bold}>{ticket.ticketEndTime.toLocaleString()}</Text></Text>
                  <View style={styles.ticketAction}>
                    <TouchableOpacity style={styles.button} onPress={() => {console.log("Add Time")}}>
                      <Text style={styles.buttonText}>Add Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {console.log("Close Ticket")}}>
                      <Text style={styles.buttonText}>Close Ticket</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("I_MainPage")}> 
                  <Text style={styles.buttonText}>Back to Main Page</Text>
              </TouchableOpacity>)
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
  button: {
      backgroundColor: "#007bff",
      padding: 12,
      margin: 16,
      borderRadius: 10,
      alignItems: "center",
  },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
  },
  ticketAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

});