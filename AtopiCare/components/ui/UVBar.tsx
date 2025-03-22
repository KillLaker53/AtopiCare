import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {getUVGradient} from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

type Props = {
    uvIndex: number;
    onClose: () => void;
};

const getUVInfo = (uv: number) => {
    if (uv <= 2) return { level: "Low", description: "Low risk. Minimal protection needed.", colors: ["#4CAF50", "#66BB6A"] };
    if (uv <= 5) return { level: "Moderate", description: "Moderate risk. Wear sunglasses and sunscreen.", colors: ["#FFEB3B", "#FFC107"] };
    if (uv <= 7) return { level: "Hgh", description: "High risk. Limit time in direct sunlight.", colors: ["#FF9800", "#F44336"] };
    if (uv <= 10) return { level: "Very High", description: "Very high risk. Seek shade and wear protection.", colors: ["#D32F2F", "#B71C1C"] };
    return { level: "Extreme", description: "Extreme risk. Avoid sun exposure.", colors: ["#880E4F", "#4A148C"] };
};

export default function UVBar({ uvIndex, onClose }: Props) {
    const { level, description, colors } = getUVInfo(uvIndex);

    return (
        <View style={styles.container}>
            <LinearGradient colors={getUVGradient(uvIndex)} style={styles.gradient}>
                <View style={styles.content}>
                    <Text style={styles.title}>UV Index in Bulgaria</Text>
                    <Text style={styles.uvValue}>Current UV: {uvIndex} ({level})</Text>
                    <Text style={styles.description}>{description}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: height * 0.1,
        left: 20,
        right: 20,
        borderRadius: 15,
        overflow: "hidden",
        zIndex: 30,
        elevation: 10,
    },
    gradient: {
        padding: 20,
        borderRadius: 15,
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    uvValue: {
        fontSize: 16,
        color: "white",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
    },
});