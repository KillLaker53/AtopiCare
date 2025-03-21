import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    AuthScreen: undefined;
    UploadPhotoScreen: undefined;
};

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "UploadPhotoScreen">;

const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const navigation = useNavigation<AuthScreenNavigationProp>();

    const handleRegister = async () => {
        if (!email || !password || !firstName || !lastName || !username) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post('http://10.0.2.2:3000/authentication/register', {
                email,
                password,
                firstName,
                lastName,
                username
            });

            Alert.alert("Success", "You have successfully registered!");

            await AsyncStorage.setItem("accessToken", response.data.accessToken);

            setIsRegistering(false);

        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "Registration failed");
        }
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post('http://10.0.2.2:3000/authentication/login', {
                username,
                password
            });

            Alert.alert("Success", "You have successfully logged in!");
            navigation.navigate("UploadPhotoScreen");
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "Login failed");
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: width * 0.05,
        },
        appTitle: {
            fontWeight: "bold",
            fontSize: width * 0.08,
            textAlign: "center",
            color: isDarkTheme ? "#99ddff" : "#007AFF",
            paddingVertical: height * 0.03,
            fontFamily: "Garamond",
        },
        input: {
            width: "85%",
            padding: width * 0.04,
            borderWidth: 1,
            borderRadius: 30,
            marginBottom: 12,
            borderColor: isDarkTheme ? "#99ddff" : "#007AFF",
            backgroundColor: isDarkTheme ? "rgba(153, 221, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
            color: isDarkTheme ? "white" : "black",
            fontSize: width * 0.04,
        },
        buttonPrimary: {
            width: "60%",
            paddingVertical: height * 0.02,
            backgroundColor: "#007AFF",
            borderRadius: 30,
            marginTop: height * 0.02,
            alignItems: "center",
            shadowColor: "#007AFF",
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 5,
        },
        buttonSecondary: {
            width: "60%",
            paddingVertical: height * 0.02,
            backgroundColor: isDarkTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
            borderRadius: 30,
            marginTop: height * 0.02,
            alignItems: "center",
            borderWidth: 1,
            borderColor: isDarkTheme ? "#99ddff" : "#007AFF",
        },
        buttonText: {
            color: "white",
            fontSize: width * 0.05,
            fontWeight: "bold",
        },
        buttonTextSecondary: {
            color: isDarkTheme ? "#99ddff" : "#007AFF",
            fontSize: width * 0.05,
        },
        icon: {
            fontSize: width * 0.25,
            marginBottom: height * 0.03,
            marginTop: height * 0.01,
            color: isDarkTheme ? "#99ddff" : "#007AFF",
        },
        iconTheme: {
            fontSize: width * 0.07,
            color: isDarkTheme ? "white" : "black",
            position: "absolute",
            bottom: height * 0.038,
            left: width * 0.35,
        },
    });

    return (
        <LinearGradient
            colors={isDarkTheme ? ["#0f0c29", "#302b63", "#24243e"] : ["#ffffff", "#f2f2f2"]}
            style={styles.container}
        >
            <Text style={styles.appTitle}>ATOPICARE</Text>

            <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
                <Ionicons
                    style={styles.iconTheme}
                    name={isDarkTheme ? "contrast" : "contrast-outline"}
                />
            </TouchableOpacity>

            <Ionicons style={styles.icon} name="person-circle-outline" />

            {isRegistering && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={isDarkTheme ? "white" : "black"}
                        value={firstName}
                        onChangeText={setFirstName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={isDarkTheme ? "white" : "black"}
                        value={lastName}
                        onChangeText={setLastName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={isDarkTheme ? "white" : "black"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </>
            )}

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={isDarkTheme ? "white" : "black"}
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={isDarkTheme ? "white" : "black"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={isRegistering ? handleRegister : handleLogin}
            >
                <Text style={styles.buttonText}>
                    {isRegistering ? "Sign Up" : "Sign In"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setIsRegistering(!isRegistering)}
            >
                <Text style={styles.buttonTextSecondary}>
                    {isRegistering ? "Sign In" : "Sign Up"}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}