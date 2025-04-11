
import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "./AuthContext";
import { mainEntity } from './entity/mainEntity';

function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) {
        return null;
    }

    return (
        <View style={styles.modalBackdrop}>
            <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalDescription}>{message}</Text>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        onPress={onConfirm}
                        style={styles.confirmButton}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onCancel}
                        style={styles.modalButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default function I_EditProfile({ navigation }) {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    // Check if user is logged in
    if (!isLoggedIn) {
        navigation.navigate("I_Login");
        return;
    }

    const [firstName, setFirstName] = useState(mainEntity.getUserFirstName());
    const [lastName, setLastName] = useState(mainEntity.getUserLastName());
    const [email, setEmail] = useState(mainEntity.getUserEmail());
    const [phoneNo, setPhoneNo] = useState(mainEntity.getUserPhoneNo());

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleUpdateProfile = async (prompt, logout = false) => {
        // If prompt is true, and if we're updating email
        if (prompt && email !== mainEntity.getUserEmail()) {
            // Display confirmation prompt
            setShowConfirmation(true);
            return
        }

        const userInfo = {
            userID: mainEntity.getUserID(),
            userEmail: email,
            firstName: firstName,
            lastName: lastName,
            userPhoneNo: phoneNo
        };
        try {
            // Update user info to server
            const updateUserInfoRes = await fetch(`http://localhost:3000/UserInfo`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            });
            if (updateUserInfoRes.status !== 200) {
                console.log("error: something went wrong updating user info");
            }
            // Update `mainEntity`
            mainEntity.setUserInformation(userInfo);
        } catch (error) {
            console.log("error updating user info", error);
        }
        if (logout) {
            setIsLoggedIn(false);
        } else {
            navigation.goBack()
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ConfirmationModal
                    isOpen={showConfirmation}
                    title="Confirm Delete"
                    message="You will be logged out when changing your email. Are you sure?"
                    onConfirm={() => handleUpdateProfile(false, true)}
                    onCancel={() => setShowConfirmation(false)}
                />
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
                    onPress={() => handleUpdateProfile(true)}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        width: '90%',
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
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalBox: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        minWidth: '300px',
        textAlign: 'center',
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: '2em',
    },
    modalDescription: {
        textAlign: 'center',
        fontSize: '1em',
        color: '#666666',
        marginTop: '10px',
    },
    modalButtons: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    modalButton: {
        backgroundColor: "#4682b4",
        color: '#ffffff',
        borderRadius: 5,
        paddingVertical: 15,
        margin: 10,
    },
    confirmButton: {
        backgroundColor: '#ff0000',
        color: '#ffffff',
        borderRadius: 5,
        paddingVertical: 15,
        margin: 10,
    },
});
