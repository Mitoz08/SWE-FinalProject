
import React, { useContext, useState, useEffect, useLocation } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "./AuthContext";

export default function I_EditProfile({ route, navigation }) {
    const { isLoggedIn } = useContext(AuthContext);

    // Check if user is logged in
    if (!isLoggedIn) {
        navigation.navigate("I_Login");
        return;
    }

    const { userProfile } = route.params;
    const splittedName = userProfile.name.split(" ");
    const [firstName, setFirstName] = useState(splittedName[0] || "");
    const [lastName, setLastName] = useState(splittedName[1] || "");
    const [email, setEmail] = useState(userProfile.email);
    const [phoneNo, setPhoneNo] = useState(userProfile.phoneNumber);

    console.log("[userProfile]", userProfile);

    const handleUpdateProfile = async () => {
        // Update user profile to server
        const name = `${firstName} ${lastName}`;
        console.log(`TODO: handle update profile (${name}, ${email}, ${phoneNo})`);
        //const {userID, userEmail, firstName, lastName, userPhoneNo} = object;
        const object = {
            userID: userProfile.id,
            userEmail: userProfile.email,
            firstName: firstName,
            lastName: lastName,
            userPhoneNo: phoneNo
        };
        console.log('[DEBUG]', object)

        try {
            const res1 = await fetch(`http://localhost:3000/UserInfo`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object)
            });
        } catch (error) {
            console.log("error updating user info", error)
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.profileHeader}>
                        <Text style={styles.headerTitle}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="FirstName"
                        />

                        <Text style={styles.headerTitle}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="LastName"
                        />
                    </View>

                    <View style={styles.profileDetails}>
                        <View style={styles.profileItem}>
                            <Text style={styles.itemLabel}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Email"
                            />
                        </View>
                        
                        <View style={styles.profileItem}>
                            <Text style={styles.itemLabel}>Phone Number:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPhoneNo}
                                value={phoneNo}
                                placeholder="PhoneNo"
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleUpdateProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        backgroundColor: '#E1E1E1',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 18,
        marginVertical: 20,
    },
    profileDetails: {
        width: '100%',
        marginBottom: 30,
    },
    profileItem: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    itemLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    itemValue: {
        fontSize: 18,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
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
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        height: 80,
        margin: 10,
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
});
