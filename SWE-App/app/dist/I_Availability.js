import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function I_Availability({route, navigation}) {
    const { carparkList } = route.params || {carparkList: []}

    // carparkList would be the array being passed by I_InputVehDetail

    return(
        <SafeAreaProvider>
            <SafeAreaView>
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
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center'
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 16,
      borderRadius: 8
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 16,
      borderRadius: 8
    },
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 16
    },
    loadingText: {
      fontSize: 18,
      textAlign: 'center'
    },
    card: {
      backgroundColor: '#f2f2f2',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'blue',
      textDecorationLine: 'underline'
    },
    infoContainer: {
      marginTop: 4
    }
  });