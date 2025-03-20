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
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const navigation = useNavigation<AuthScreenNavigationProp>(); // Fix navigation type

    const handleRegister = () => {
        if (!email || !password || !firstName || !lastName || !username) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        Alert.alert("Success", "You have successfully registered!");
        setIsRegistering(false);
    };

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in both fields.");
            return;
        }
        Alert.alert("Success", "You have successfully logged in!");

        navigation.navigate("UploadPhotoScreen");
    };

    const toggleTheme = () => {
        setIsDarkTheme((prevState) => !prevState);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: width * 0.05,
            paddingTop: height * 0.08,
            paddingBottom: height * 0.05,
        },
        appTitle: {
            fontWeight: "bold",
            fontSize: 30,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            backgroundColor: "#007AFF",
            color: "white",
            paddingVertical: 40,
            width: "100%",
            fontFamily: "Garamond",
        },
        input: {
            width: "80%",
            padding: width * 0.04,
            borderWidth: 1,
            borderRadius: 30,
            marginBottom: 15,
            borderColor: isDarkTheme ? "#99ddff" : "#0f0c29",
            backgroundColor: isDarkTheme ? "#99ddff" : "#0f0c29",
            color: isDarkTheme ? "black" : "white",
            fontSize: width * 0.04,
        },
        inputSmaller: {
            width: "80%",
            padding: width * 0.03,
            borderWidth: 1,
            borderRadius: 30,
            marginBottom: 10,
            fontSize: width * 0.03,
            borderColor: isDarkTheme ? "gray" : "#99ddff",
            backgroundColor: isDarkTheme ? "gray" : "#99ddff",
            color: isDarkTheme ? "white" : "black",
        },
        buttonPrimary: {
            width: "60%",
            paddingVertical: height * 0.02,
            backgroundColor: "#007AFF",
            borderRadius: 30,
            marginTop: height * 0.02,
            alignItems: "center",
        },
        buttonSecondary: {
            width: "60%",
            paddingVertical: height * 0.02,
            backgroundColor: "white",
            borderRadius: 30,
            marginTop: height * 0.02,
            alignItems: "center",
        },
        buttonText: {
            color: "#fff",
            fontSize: width * 0.05,
        },
        buttonTextSecondary: {
            color: "#007AFF",
            fontSize: width * 0.05,
        },
        icon: {
            fontSize: width * 0.25,
            marginBottom: height * 0.03,
            marginTop: height * 0.01,
            color: "#007AFF",
        },
        iconTheme: {
            fontSize: width * 0.07,
            color: "black",
            marginTop: height * 0.11,
            marginLeft: width * 0.9,
        },
    });

    return (
        <LinearGradient
            colors={isDarkTheme ? ["#0f0c29", "#302b63", "#24243e"] : ["white", "#80bfff"]}
            style={styles.container}
        >
            <Text style={styles.appTitle}>ATOPICARE</Text>

            <TouchableOpacity onPress={toggleTheme}>
                <Ionicons
                    style={styles.iconTheme}
                    name={isDarkTheme ? "contrast" : "contrast-outline"}
                    size={width * 0.2}
                    color={isDarkTheme ? "white" : "black"}
                />
            </TouchableOpacity>

            <Ionicons style={styles.icon} name="person-circle-outline" size={width * 0.25} color="black" />

            {isRegistering && (
                <>
                    <TextInput
                        style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]
                    }
                        placeholder="first name"
                        value={firstName}
                        onChangeText={setFirstName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                        placeholder="last name"
                        value={lastName}
                        onChangeText={setLastName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                        placeholder="email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </>
            )}

            <TextInput
                style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.buttonPrimary} onPress={isRegistering ? handleRegister : handleLogin}>
                <Text style={styles.buttonText}>{isRegistering ? "Sign Up" : "Sign In"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setIsRegistering((prev) => !prev)}>
                <Text style={styles.buttonTextSecondary}>{isRegistering ? "Sign In" : "Sign Up"}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}