import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Picker, Alert } from 'react-native';
import { Linking } from 'react-native'; // Import Linking for URL navigation
import carparkData from './HDBCarparkInformation.json'; // Import JSON file directly

const API_URL = "https://api.data.gov.sg/v1/transport/carpark-availability";
//hello
export default function ContactScreen() {
  const [carparks, setCarparks] = useState([]);
  const [carparkAddresses, setCarparkAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [licensePlate, setLicensePlate] = useState(''); // State for license plate
  const [selectedCarparkType, setSelectedCarparkType] = useState(''); // State for carpark type

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          setCarparks(data.items[0].carpark_data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    const addressMap = {};
    carparkData.forEach(item => {
      addressMap[item.car_park_no.trim()] = item.address.trim();
    });
    setCarparkAddresses(addressMap);
  }, []);

  const handleCarparkPress = (carparkNumber) => {
    const paymentUrl = `https://ntulearn.ntu.edu.sg/ultra/institution-page=${carparkNumber}`;
    Linking.openURL(paymentUrl).catch(err => console.error("Failed to open URL:", err));
  };

  const filteredCarparks = carparks.filter(carpark => {
    const carparkAddress = carparkAddresses[carpark.carpark_number.trim()];
    return (
      carparkAddress && carparkAddress !== 'N/A' &&
      carpark.carpark_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
      carpark.carpark_info.some(info => info.lot_type === selectedCarparkType)
    );
  });

  // Validate license plate (simple non-empty check)
  const isLicensePlateValid = licensePlate.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carpark Availability Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter License Plate Number"
        value={licensePlate}
        onChangeText={text => setLicensePlate(text)}
      />
      {isLicensePlateValid ? (
        <>
          <Picker
            selectedValue={selectedCarparkType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCarparkType(itemValue)}
          >
            <Picker.Item label="Select Carpark Type" value="" />
            <Picker.Item label="Motor" value="M" />
            <Picker.Item label="Car" value="C" />
          </Picker>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by carpark code..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </>
      ) : (
        <Text style={styles.promptText}>Please enter your license plate number to select carpark type and search.</Text>
      )}
      {loading ? (
        <Text style={styles.loadingText}>Loading data...</Text>
      ) : (
        <FlatList
          data={filteredCarparks}
          keyExtractor={(item) => item.carpark_number}
          renderItem={({ item }) => {
            const carparkAddress = carparkAddresses[item.carpark_number.trim()] || 'N/A';
            return (
              <View style={styles.card}>
                <TouchableOpacity onPress={() => handleCarparkPress(item.carpark_number)}>
                  <Text style={styles.cardTitle}>
                    Carpark: {item.carpark_number}
                  </Text>
                </TouchableOpacity>
                <Text>Address: {carparkAddress}</Text>
                {item.carpark_info && item.carpark_info.map((info, index) => (
                  info.lot_type === selectedCarparkType && (
                  <View key={index} style={styles.infoContainer}>
                    <Text>Total Lots: {info.total_lots}</Text>
                    <Text>Lot Type: {info.lot_type}</Text>
                    <Text>Available Lots: {info.lots_available}</Text>
                  </View>
                  )
                ))}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8' // Light background color for a modern look
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333' // Darker text color for contrast
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2 // Shadow for Android
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666' // Subtle text color for loading
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff', // Blue color for emphasis
    textDecorationLine: 'underline'
  },
  infoContainer: {
    marginTop: 8
  },
  promptText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center'
  }
});