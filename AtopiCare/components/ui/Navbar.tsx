import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const getUVInfo = (uv: number) => {
    if (uv <= 2) return { level: "Low", description: "Low risk. Minimal protection needed.", colors: ["#4CAF50", "#66BB6A"] };
    if (uv <= 5) return { level: "Moderate", description: "Moderate risk. Wear sunglasses and sunscreen.", colors: ["#FFEB3B", "#FFC107"] };
    if (uv <= 7) return { level: "High", description: "High risk. Limit time in direct sunlight.", colors: ["#FF9800", "#F44336"] };
    if (uv <= 10) return { level: "Very High", description: "Very high risk. Seek shade and wear protection.", colors: ["#D32F2F", "#B71C1C"] };
    return { level: "Extreme", description: "Extreme risk. Avoid sun exposure.", colors: ["#880E4F", "#4A148C"] };
};

export default function Navbar() {
    const [uvIndex, setUvIndex] = useState<number | null>(null);
    const [showUVInfo, setShowUVInfo] = useState(false);

    useEffect(() => {
        const fetchUvIndex = async () => {
            try {
                const response = await axios.get("http://localhost:3000/uv-api/uv-index");
                setUvIndex(response.data.uvIndex);
            } catch (error) {
                console.error("Error fetching UV index:", error);
            }
        };
        fetchUvIndex();
    }, []);

    const getUVGradient = (uv: number): [string, string, string] => {
        if (uv <= 1) return ["#4CAF50", "#66BB6A", "#81C784"];
        if (uv <= 3) return ["#FFEB3B", "#FFC107", "#FF9800"];
        if (uv <= 5) return ["#FF9800", "#FF5722", "#F44336"];
        if (uv <= 7) return ["#F44336", "#D32F2F", "#C62828"];
        if (uv <= 9) return ["#C62828", "#B71C1C", "#880E4F"];
        return ["#880E4F", "#8B0000", "#800000"];
    };

    return (
        <>
            <View style={styles.navbarContainer}>
                <Ionicons style={styles.icon} name="arrow-back" size={width * 0.1} color="white" />
                {uvIndex !== null && (
                    <TouchableOpacity style={styles.uvContainer} onPress={() => setShowUVInfo(true)}>
                        <View style={styles.uvIndicator}>
                            <LinearGradient colors={getUVGradient(uvIndex)} style={StyleSheet.absoluteFill} />
                        </View>
                        <Text style={styles.uvText}>UV {uvIndex}</Text>
                    </TouchableOpacity>
                )}
                <Ionicons style={styles.icon} name="camera" size={width * 0.1} color="white" />
                <Ionicons style={styles.icon} name="chatbubbles" size={width * 0.1} color="white" />
                <Ionicons style={styles.icon} name="person-circle-outline" size={width * 0.1} color="white" />
                <Ionicons style={styles.icon} name="exit" size={width * 0.1} color="white" />
            </View>

            {showUVInfo && uvIndex !== null && (
                <View style={styles.uvBarContainer}>
                    <LinearGradient colors={getUVGradient(uvIndex)} style={styles.uvBar}>
                        <View style={styles.uvBarContent}>
                            <Text style={styles.uvBarTitle}>UV Index in Bulgaria</Text>
                            <Text style={styles.uvBarValue}>
                                Current UV: {uvIndex} ({getUVInfo(uvIndex).level})
                            </Text>
                            <Text style={styles.uvBarDescription}>
                                {getUVInfo(uvIndex).description}
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowUVInfo(false)}>
                                <Ionicons name="close-circle-outline" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(20, 20, 50, 0.85)",
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.05,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        zIndex: 20,
    },
    icon: {
        fontSize: width * 0.09,
    },
    uvContainer: {
        alignItems: "center",
        marginTop: height * 0.03,
    },
    uvIndicator: {
        width: width * 0.07,
        height: width * 0.07,
        borderRadius: width * 0.06,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 3,
        overflow: "hidden",
    },
    uvText: {
        color: "white",
        fontSize: width * 0.03,
        fontWeight: "bold",
    },
    uvBarContainer: {
        position: "absolute",
        top: height * 0.1,
        left: 20,
        right: 20,
        borderRadius: 15,
        overflow: "hidden",
        zIndex: 30,
        elevation: 10,
    },
    uvBar: {
        padding: 20,
        borderRadius: 15,
    },
    uvBarContent: {
        alignItems: "center",
    },
    uvBarTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    uvBarValue: {
        fontSize: 16,
        color: "white",
        marginBottom: 5,
    },
    uvBarDescription: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
    },
});