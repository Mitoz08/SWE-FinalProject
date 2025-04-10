import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import viewTicketControl from "./controller/viewTicketsControl";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function I_ViewTickets({navigation}) {

  const [ticket, setTicket] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddTimeModal, setAddTimeModal] = useState(false);
  const [showCloseTicketModal, setCloseTicketModal] = useState(false);
  const [showPastTicketModal, setPastTicketModal] = useState(false);
  const [PastTicket, setPastTicket] = useState(null);
  const [pastTickets, setPastTickets] = useState([])



  useEffect(() => {
    async function fetchTicket() {
      try{
        const {address, ticket} = await viewTicketControl.getTicket();
        const ticketArray = await viewTicketControl.getAllClosedTickets()
        console.log("Fetching ticket", ticket)
        setPastTickets(ticketArray)
        setTicket(ticket);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching ticket in I_ViewTickets:", error);
      } finally {
        setLoading(false);
      }
    }
    if (!showAddTimeModal || !showCloseTicketModal){
      fetchTicket();
    }
  }, [showAddTimeModal, showCloseTicketModal]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <Text>Loading ticket info...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  if (!ticket?.ticketID) return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text>No Open Tickets</Text>
        </View>

        {/* Display Past Tickets and Back to Main Page Button */}
        <FlatList
          style={{ flex: 1 }}
          data={pastTickets.sort((a, b) => b.ticketID - a.ticketID)}
          keyExtractor={(item) => item.ticketID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setPastTicket(item);
                setPastTicketModal(true);
              }}
            >
              <Text>Ticket ID: {item.ticketID}</Text>
              <Text>Address: {item.address}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("I_MainPage")}>
            <Text style={styles.buttonText}>Back to Main Page</Text>
          </TouchableOpacity>
        </View>
        <PastTicketModal
        ticket={PastTicket}
        showModal={showPastTicketModal}
        setShowModal={setPastTicketModal}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )

  return(
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        <View style={{ padding: 16 }}>
          <View style={styles.card}>
            <Text style={styles.ticketID}>Ticket ID: {ticket.ticketID}</Text>
            <Text style={styles.detail}>Parking Lot: <Text style={styles.bold}>{ticket.parkingLotID}</Text></Text>
            <Text style={styles.detail}>Address: <Text style={styles.bold}>{address}</Text></Text>
            <Text style={styles.detail}>License Plate: <Text style={styles.bold}>{ticket.licensePlate}</Text></Text>
            <Text style={styles.detail}>Start Time: <Text style={styles.bold}>{ticket.ticketStartTime.replace("T", " ").substr(0, 19)} </Text></Text>
            <Text style={styles.detail}>End Time: <Text style={styles.bold}>{ticket.ticketEndTime.replace("T", " ").substr(0, 19)}</Text></Text>
          </View>
          

          <View style={styles.fixedButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { setAddTimeModal(true) }}>
              <Text style={styles.buttonText}>Add Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { setCloseTicketModal(true) }}>
              <Text style={styles.buttonText}>Close Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("I_MainPage")}>
              <Text style={styles.buttonText}>Back to Main Page</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          style={{ flex: 1 }}
          data={pastTickets.sort((a, b) => b.ticketID - a.ticketID)}
          keyExtractor={(item) => item.ticketID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setPastTicket(item);
                setPastTicketModal(true);
              }}
            >
              <Text>Ticket ID: {item.ticketID}</Text>
              <Text>Address: {item.address}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <PastTicketModal
        ticket={PastTicket}
        showModal={showPastTicketModal}
        setShowModal={setPastTicketModal}
      />
      <AddTimeModal
        ticketID={ticket.ticketID}
        endTime={ticket.ticketEndTime}
        showModal={showAddTimeModal}
        setShowModal={setAddTimeModal}
      />
      <CloseTicketModal
        ticket={ticket}
        showModal={showCloseTicketModal}
        setShowModal={setCloseTicketModal}
      />
    </SafeAreaView>
  </SafeAreaProvider>

  )
}

// const PastTicketFlatList = ({ticketArray, setShowModal, setTicketID}) => {

//   const sortedTickets = ticketArray.sort((a,b) => b.ticketID - a.ticketID)

//   return (
//     <SafeAreaView style={{flex:1}} >
//       <View>
//         <FlatList
//           data={sortedTickets}
//           keyExtractor={(item) => item.ticketID.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity 
//               style={styles.card}
//               onPress={() => {
//                 setTicketID(item)
//                 setShowModal(true)
//               }}
//             >
//               <Text>Ticket ID: ${item.ticketID}</Text>
//               <Text>Address: ${item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   )
// }


const PastTicketModal = ({ticket, showModal, setShowModal}) => {
  if (!ticket) return
  return (
    <Modal
    visible={showModal}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.ticketID}>Ticket ID: {ticket.ticketID}</Text>
          <Text style={styles.detail}>Carpark Address: {ticket.address}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setShowModal(false)}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const AddTimeModal = ({ticketID, endTime, showModal, setShowModal}) => {

  const intervalTime = 30;
  const [incrementStr, setIncrementStr] = useState("")
  const [increment, setIncrement] = useState(1)
  const [processing, setProcessing] = useState(false)
  const [max, setMax] = useState(false);
  const [min, setMin] = useState(false);


  const curEndTime = new Date(endTime)
  const newEndTime = new Date(endTime)
  newEndTime.setMinutes(curEndTime.getMinutes() + intervalTime*increment)

  const addTime = () => {
    if(increment >= 24) {
      setMax(true)
      return false;
    } else {
      setMin(false)
      setIncrement(increment + 1)
      return true;
    }
  }

  const removeTime = () => {
    if(increment <= 1) {
      setMin(true)
      return false;
    } else {
      setMax(false)
      setIncrement(increment - 1)
      return true;
    }
  }

  useEffect(() => {
      const updateIncrementTime = () => {
        const hour = Math.floor((increment*intervalTime)/60)
        const mins = (increment*intervalTime)%60
        setIncrementStr(`${hour} Hr${hour > 1? "s":""} ${mins == 0? "00":mins} Mins`)
      }

      updateIncrementTime()
    }, [increment]
  )

  useEffect(() => {
    if (showModal) {
      setIncrement(1);
      setIncrementStr(`0 Hr 30 Mins`); 
    }
  }, [showModal])

  const handleConfirm = () => {
    if (processing) return
    setProcessing(true)
    viewTicketControl.addTime(ticketID, newEndTime)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            setShowModal(false)
          }, 1000);
        } else {
          console.log("Error adding time in I_ViewTickets")
        }
      })
      .finally(() => {
        setProcessing(false)
      })
  }


  return (
<Modal
  visible={showModal}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setShowModal(false)}>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Current End Time: {curEndTime.toISOString().replace("T", " ").substr(0,19)}</Text>
      <Text style={styles.modalText}>New End Time: {newEndTime.toISOString().replace("T", " ").substr(0,19)}</Text>
  
      <View style={styles.iconButtonRow}>
        <TouchableOpacity style={styles.payButton} onPress={addTime}>
          <AntDesign name="pluscircle" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.timeText}>Extension</Text>
          <Text style={styles.timeText}>{incrementStr}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={removeTime}>
          <AntDesign name="minuscircle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.errorMsg}>
          {min ? "Minimum duration is 30 mins" : max ? "Maximum duration is 12 hours" : ""}
      </Text>

      <View style={styles.iconButtonRow}>
        <TouchableOpacity
          style={[styles.payButton, processing && styles.disabledButton]} 
          onPress={handleConfirm}
          disabled={processing} 
        >
          <Text style={styles.payButtonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payButton} onPress={() => setShowModal(false)}>
          <Text style={styles.payButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
  )
}

const CloseTicketModal = ({ticket, showModal, setShowModal}) => {

  const [processing, setProcessing] = useState(false)

  const ticketID = ticket.ticketID
  const ticketStartTime = new Date(ticket.ticketStartTime)
  const ticketEndTime = new Date(ticket.ticketEndTime)
  const currentTime = new Date()
  currentTime.setHours(currentTime.getHours() + 8)
  const duration = (currentTime - ticketStartTime)/(60*60*1000)
  const totalHalfHours = Math.ceil(duration * 2); 
  const hours = Math.floor(totalHalfHours / 2);
  const mins = totalHalfHours % 2 === 0 ? 0 : 30;

  const handleConfirm = () => {
    if (processing) return
    setProcessing(true)
    viewTicketControl.closeTicket(ticketID, currentTime)
      .then((res) => {
        console.log(res)
        if (res) {
          setTimeout(() => {
            setShowModal(false)
          }, 1000);
        } else {
          console.log("Error closing ticket in I_ViewTickets")
        }
      })
      .finally(() => {
        setProcessing(false)
      })
  }

  return (
    <Modal
    visible={showModal}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Start Time: {ticketStartTime.toISOString().replace("T", " ").substr(0,19)}</Text>
          <Text style={styles.modalText}>End Time: {ticketEndTime.toISOString().replace("T", " ").substr(0,19)}</Text>
          <Text style={styles.modalText}>Current Time: {currentTime.toISOString().replace("T", " ").substr(0,19)}</Text>
          <Text style={styles.modalText}>Time Charged: {hours} Hr{hours > 1? "s":""} {mins == 0? "00":mins} Mins</Text>
          <Text style={styles.modalText}>Do you want to proceed?</Text>
          <View style={styles.iconButtonRow}>
            <TouchableOpacity
              style={[styles.payButton, processing && styles.disabledButton]} 
              onPress={handleConfirm}
              disabled={processing} 
            >
              <Text style={styles.payButtonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.payButton} onPress={() => setShowModal(false)}>
              <Text style={styles.payButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
      backgroundColor: "#4682b4",
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
  errorMsg: {
    color: "#F00",
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  payButton: {
    backgroundColor: "#4682b4",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  iconButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 10,
  },
  
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  disabledButton: {
    backgroundColor: '#ccc',
  },
  timeText: {
    fontSize: 20,
    marginHorizontal: 15,
    color: "#333",
  },

  timeText: {
    fontSize: 20,
    marginHorizontal: 15,
    color: "#333",
  },

});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f3f4f6",
//   },
//   card: {
//     padding: 16,
//     backgroundColor: "white",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   ticketID: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   detail: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//   },
//   bold: {
//     fontWeight: "600",
//     color: "#222",
//   },
//   button: {
//     margin: 10,
//     paddingVertical: 20, // Increased padding for larger buttons
//     paddingHorizontal: 30, // Increased padding for larger buttons
//     backgroundColor: "#4682b4",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   buttonText: {
//       color: "#fff",
//       fontSize: 18, // Increased font size for better readability
//       fontWeight: "bold",
//       textAlign: "center",
//   },
//   fixedButtonContainer: {
//     marginTop: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },
//   fixedButton: {
//     flex: 1,
//     marginHorizontal: 8,
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
// });

