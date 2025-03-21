import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FoodResultProps {
    food: string;
    stressLevel: "low" | "medium" | "high";
    riskPercentage: number;
}

const getRiskLevel = (riskPercentage: number) => {
    if (riskPercentage <= 20) {
        return { level: "SAFE", description: "Low risk, no worries!" };
    } else if (riskPercentage <= 40) {
        return { level: "LOW RISK", description: "Mild risk, monitor symptoms." };
    } else if (riskPercentage <= 60) {
        return { level: "MODERATE RISK", description: "Moderate risk, proceed with caution." };
    } else if (riskPercentage <= 80) {
        return { level: "HIGH RISK", description: "High risk, avoid if possible." };
    } else {
        return { level: "VERY HIGH RISK", description: "Very high risk, avoid this food!" };
    }
};

export default function FoodResult({ food, stressLevel, riskPercentage}: FoodResultProps) {
    const { level, description } = getRiskLevel(riskPercentage);

    return (
        <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Result for: {food}</Text>
            <Text style={styles.resultText}>
                This food is {level === "SAFE" ? "✅ SAFE" : "⚠️ POTENTIALLY IRRITATING"} for atopic dermatitis.
            </Text>
            <Text style={styles.resultText}>Risk Percentage: {riskPercentage}%</Text>
            <Text style={styles.resultText}>Stress Level: {stressLevel.toUpperCase()}</Text>
            <Text style={styles.resultNote}>
                {level === "SAFE"
                    ? "This food is not commonly associated with flare-ups, but track your symptoms."
                    : description}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultBox: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        borderColor: "#00c6ff",
        borderWidth: 1,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    resultText: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    resultNote: {
        marginTop: 10,
        color: "#ccc",
        fontSize: 14,
        fontStyle: "italic",
    },
    alternativesTitle: {
        fontSize: 18,
        color: "white",
        marginTop: 20,
        fontWeight: "bold",
    },
    alternativesContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    alternativeText: {
        color: "white",
        fontSize: 16,
        marginVertical: 5,
    },
});
