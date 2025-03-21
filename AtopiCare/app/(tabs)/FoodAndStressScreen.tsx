import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "@/components/ui/Navbar";
import FoodResult from "@/components/ui/FoodResult";

const { width, height } = Dimensions.get("window");

export default function FoodAndStressScreen() {
    const [foodInput, setFoodInput] = useState("");
    const [selectedStressLevel, setSelectedStressLevel] = useState<"low" | "medium" | "high" | null>(null);
    const [result, setResult] = useState<{ food: string; stressLevel: "low" | "medium" | "high"; riskPercentage: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!foodInput || !selectedStressLevel) {
            Alert.alert("Please complete all fields.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:3000/food-result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ food: foodInput, stressLevel: selectedStressLevel }),
            });

            const data = await response.json();

            if (response.ok && typeof data.riskPercentage === "number") {
                setResult({
                    food: foodInput,
                    stressLevel: selectedStressLevel,
                    riskPercentage: data.riskPercentage,
                });

                setFoodInput("");
                setSelectedStressLevel(null);
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to check food safety.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
            <Navbar uvIndex={4} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>TEST A FOOD</Text>
                    <TextInput
                        placeholder="Enter a food to test"
                        placeholderTextColor="#ccc"
                        value={foodInput}
                        onChangeText={setFoodInput}
                        style={styles.input}
                    />

                    <Text style={styles.subtitle}>Stress level now:</Text>
                    <View style={styles.stressOptions}>
                        {["low", "medium", "high"].map(level => (
                            <TouchableOpacity
                                key={level}
                                style={[
                                    styles.stressButton,
                                    selectedStressLevel === level && styles.stressButtonSelected
                                ]}
                                onPress={() => setSelectedStressLevel(level as any)}
                            >
                                <Text style={styles.stressText}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator size="large" color="#00c6ff" style={{ marginTop: 20 }} />}

                    {result && (
                        <FoodResult
                            food={result.food}
                            stressLevel={result.stressLevel}
                            riskPercentage={result.riskPercentage}
                        />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.15,
    },
    contentContainer: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
        fontFamily: "Garamond"
    },
    input: {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: "white",
        marginBottom: 30,
    },
    subtitle: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    stressOptions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 30,
    },
    stressButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
    },
    stressButtonSelected: {
        backgroundColor: "#00c6ff",
        borderColor: "#00c6ff",
    },
    stressText: {
        color: "white",
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#00c6ff",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        elevation: 5,
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});