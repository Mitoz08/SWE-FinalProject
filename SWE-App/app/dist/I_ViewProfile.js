
import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthContext";

export default function I_ViewProfile({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState({
        id: mainEntity.getUserID(),
        name: "",
        email: "",
        phoneNumber: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Check if user is logged in
            if (!isLoggedIn) {
                navigation.navigate("I_Login");
                return;
            }

            try {
                // Fetch user profile data
                // Replace with your actual API endpoint to fetch user profile
                const response = await fetch("http://localhost:3000/UserInfo?userID=" + mainEntity.getUserID(), {
                    method: "GET",
                    // Add authentication headers if needed
                });
                
                try {
                    if (response.ok) {
                        const res = await response.json();
                        setUserProfile({
                            id: res.userInfo.userID,
                            name: `${res.userInfo.firstName} ${res.userInfo.lastName}`,
                            email: res.userInfo.userEmail,
                            phoneNumber: res.userInfo.userPhoneNo,
                        });
                    } else {
                        alert("Failed to load profile data");
                    }
                } catch (error) {
                    console.log("error getting response:", error);
                }
            } catch (error) {
                console.log("error getting user info:", error);
                alert("An error occurred while fetching profile data");
            } finally {
                setIsLoading(false);
            };
        })();
    }, [isLoggedIn, navigation]);

    const handleEditProfile = () => {
        // Navigate to edit profile screen
        navigation.navigate("I_EditProfile", {userProfile});
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.profileHeader}>
                        <Text style={styles.headerTitle}>User Profile</Text>
                        <Text style={styles.profileName}>{userProfile.name}</Text>
                    </View>

                    {isLoading ? (
                        <Text style={styles.loadingText}>Loading profile...</Text>
                    ) : (
                        <View style={styles.profileDetails}>
                            <View style={styles.profileItem}>
                                <Text style={styles.itemLabel}>Email:</Text>
                                <Text style={styles.itemValue}>{userProfile.email}</Text>
                            </View>
                            
                            <View style={styles.profileItem}>
                                <Text style={styles.itemLabel}>Phone Number:</Text>
                                <Text style={styles.itemValue}>{userProfile.phoneNumber}</Text>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleEditProfile}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
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
});
