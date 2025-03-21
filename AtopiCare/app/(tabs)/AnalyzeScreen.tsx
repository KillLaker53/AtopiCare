import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

export default function AnalyzeScreen() {
    return (
        <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
            <Navbar />
            <View style={styles.analysisContainer}>
                <Text style={styles.date}>03-12-2006</Text>
                <View style={styles.imagePlaceholder}>
                    <Ionicons name="image-outline" size={80} color="white" />
                </View>
                <Text style={styles.statusText}>STATUS:</Text>
                <View style={styles.tipContainer}>
                    <Ionicons name="alert-circle" size={30} color="#FF9800" />
                    <Text style={styles.tipText}>Tip:</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    analysisContainer: {
        width: width - 50,
        height: height - 115,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        marginTop: height * 0.13,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    imagePlaceholder: {
        width: width * 0.7,
        height: height * 0.45,
        borderRadius: 15,
        backgroundColor: "#3F51B5",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.7,
    },
    date: {
        color: "white",
        alignSelf: "flex-end",
        marginRight: width * 0.08,
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
        fontFamily: "monospace",
        paddingTop: height * 0.02,
    },
    statusText: {
        color: "white",
        fontWeight: "bold",
        fontSize: width * 0.045,
        marginTop: height * 0.02,
        marginRight: width * 0.30,
    },
    tipContainer: {
        marginTop: height * 0.05,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    tipText: {
        color: "white",
        fontWeight: "bold",
        fontSize: width * 0.05,
    },
});
