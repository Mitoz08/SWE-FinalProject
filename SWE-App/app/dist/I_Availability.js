import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Linking } from 'react-native';
import carparkData from './HDBCarparkInformation.json';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchCarparkData, fetchCarparkRates } from './controller/availabilityControl.js';

export default function ContactScreen({ navigation }) {
  const [carparks, setCarparks] = useState([]);
  const [carparkAddresses, setCarparkAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [selectedCarparkType, setSelectedCarparkType] = useState('');
  const [rates, setRates] = useState({});

  useEffect(() => {
    const loadCarparkData = async () => {
      const data = await fetchCarparkData();
      setCarparks(data);
      setLoading(false);
    };

    loadCarparkData();

    const addressMap = {};
    carparkData.forEach(item => {
      addressMap[item.car_park_no.trim()] = item.address.trim();
    });
    setCarparkAddresses(addressMap);
  }, []);

  const handleCarparkPress = (carparkNumber) => {
    if (!carparkNumber || !carparkAddresses[carparkNumber.trim()]) {
      Alert.alert("Invalid Carpark ID", "Please input a valid Parking Lot ID");
      return;
    }
    const paymentUrl = `https://ntulearn.ntu.edu.sg/ultra/institution-page=${carparkNumber}`;
    Linking.openURL(paymentUrl).catch(err => console.error("Failed to open URL:", err));
  };

  const filteredCarparks = carparks.filter(carpark => {
    const carparkAddress = carparkAddresses[carpark.carpark_number.trim()];
    return (
      carparkAddress && // Check if address exists
      carparkAddress !== 'N/A' && 
      carparkAddress.trim() !== '' && // Check if address is not empty
      carpark.carpark_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
      carpark.carpark_info.some(info => info.lot_type === selectedCarparkType)
    );
  });

  useEffect(() => {
    const loadRates = async () => {
      for (let item of filteredCarparks) {
        if (rates[item.carpark_number]) continue;
        const rate = await fetchCarparkRates(item.carpark_number, selectedCarparkType);
        setRates(prevRates => ({
          ...prevRates,
          [item.carpark_number]: rate,
        }));
      }
    };

    loadRates();
  }, [searchQuery, selectedCarparkType]);

  const isLicensePlateValid = licensePlate.trim().length > 0;

  // Function to handle search input
  const handleSearchInput = (text) => {
    if (!selectedCarparkType) {
      Alert.alert(
        "Selection Required",
        "Please select a carpark type before searching",
        [{ text: "OK" }]
      );
      return;
    }
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
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
            onValueChange={(itemValue) => {
              setSelectedCarparkType(itemValue);
              // Clear search when changing carpark type
              setSearchQuery('');
            }}
          >
            <Picker.Item label="Select Carpark Type" value="" />
            <Picker.Item label="Motor" value="M" />
            <Picker.Item label="Car" value="C" />
          </Picker>

          {selectedCarparkType ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Search by carpark code..."
              value={searchQuery}
              onChangeText={handleSearchInput}
            />
          ) : (
            <Text style={styles.promptText}>Please select a carpark type to enable search.</Text>
          )}
        </>
      ) : (
        <Text style={styles.promptText}>Please enter your license plate number to continue.</Text>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading data...</Text>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {searchQuery && filteredCarparks.length === 0 ? (
            <Text style={styles.noCarparksText}>Please input a valid Parking Lot ID</Text>
          ) : (
            <FlatList
              data={filteredCarparks}
              keyExtractor={(item) => item.carpark_number}
              renderItem={({ item }) => {
                const carparkAddress = carparkAddresses[item.carpark_number.trim()] || 'N/A';
                const Rate = rates[item.carpark_number];
                return (Rate && (
                  <View style={styles.card}>
                    <TouchableOpacity onPress={() => {
                      if (!item.carpark_number || !carparkAddresses[item.carpark_number.trim()]) {
                        Alert.alert("Invalid Carpark ID", "Please input a valid Parking Lot ID");
                        return;
                      }
                      navigation.navigate("I_PaymentUI", {
                        licensePlate: licensePlate,
                        carparkType: selectedCarparkType,
                        carparkID: item.carpark_number,
                        rate: rates[item.carpark_number],
                      });
                    }}>
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
                          <Text>Rate: {Rate}</Text>
                        </View>
                      )
                    ))}
                  </View>
                ));
              }}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8'
  },
  backButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#4682b4",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    elevation: 2
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
    height: Platform.OS === 'ios' ? 150 : 50,
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
    color: '#666'
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
    color: '#007bff',
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
  },
  scrollContainer: {
    flex: 1,
    height: "100%"
  },
  noCarparksText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ff0000',
    marginTop: 20
  }
});
