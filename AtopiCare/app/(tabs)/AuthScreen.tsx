import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleRegister = () => {
        if (!email || !password || !firstName || !lastName || !username) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        Alert.alert('Success', 'You have successfully registered!');
    };

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }
        Alert.alert('Success', 'You have successfully logged in!');
    };

    const toggleTheme = () => {
        setIsDarkTheme((prevState) => !prevState);
    };


    return (
        <View style={[styles.loginContainer, isRegistering ? styles.registerContainer : styles.loginContainer]}>
            <Text style={styles.appTitle}>ATOPICARE</Text>
            <Ionicons style={styles.icon} name="person-circle-outline" size={width * 0.25} color="black" />

            {isRegistering && (
                <>
                    <TextInput
                        style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        keyboardType="default"
                        autoCapitalize="words"
                    />
                </>
            )}

            {isRegistering && (
                <TextInput
                    style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            )}

            <TextInput
                style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, isRegistering ? styles.inputSmaller : styles.input]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.buttonCurrent}
                onPress={isRegistering ? handleRegister : handleLogin}
            >
                <Text style={styles.buttonTextCurrent}>{isRegistering ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonNotCurrent}
                onPress={() => setIsRegistering((prevState) => !prevState)}
            >
                <Text style={styles.buttonTextNotCurrent}>{isRegistering ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.toggleThemeButton}
                onPress={toggleTheme}
            >
                <Text style={styles.toggleThemeText}>{isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: width * 0.05,
        paddingTop: height * 0.08,
        paddingBottom: height * 0.05,
    },
    registerContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: width * 0.05,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.1,
    },
    appTitle: {
        fontWeight: "bold",
        fontSize: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: "#007AFF",
        color: "white",
        paddingVertical: 40,
        width: "100%",
        fontFamily: "Garamond"
    },
    input: {
        width: "80%",
        padding: width * 0.05,
        borderWidth: 1,
        borderColor: "#99ddff",
        borderRadius: 30,
        marginBottom: 15,
        backgroundColor: "#99ddff",
        fontSize: width * 0.04,
        color: "black",
    },
    inputSmaller: {
        width: "80%",
        padding: width * 0.03,
        borderWidth: 1,
        borderColor: "#99ddff",
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: "#99ddff",
        fontSize: width * 0.03,
        color: "black",
    },
    buttonCurrent: {
        width: "60%",
        paddingTop: height * 0.02,
        paddingBottom: height * 0.02,
        paddingHorizontal: width * 0.05,
        backgroundColor: "#007AFF",
        borderRadius: 30,
        marginTop: height * 0.02,
        alignItems: "center",
    },
    buttonNotCurrent: {
        width: "60%",
        paddingTop: height * 0.02,
        paddingBottom: height * 0.02,
        paddingHorizontal: width * 0.05,
        backgroundColor: "white",
        borderRadius: 30,
        marginTop: height * 0.02,
        alignItems: "center",
    },
    buttonTextCurrent: {
        color: "#fff",
        fontSize: width * 0.05,
    },
    buttonTextNotCurrent: {
        color: "#007AFF",
        fontSize: width * 0.05,
    },
    linkContainer: {
        marginTop: height * 0.03,
    },
    linkText: {
        color: "#007AFF",
        fontSize: width * 0.045,
        paddingBottom: 30,
    },
    icon: {
        fontSize: width * 0.25,
        marginBottom: height * 0.05,
        marginTop: height * 0.13,
        color: "#007AFF"
    },
    toggleThemeButton: {

    },
    toggleThemeText: {

    }
});
