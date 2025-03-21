import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router/build/useNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import UVBar from "./UVBar"; // Make sure path is correct

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
    AuthScreen: undefined;
    UploadPhotoScreen: undefined;
    profile: undefined;
    forum: undefined;
    FoodAndStressScreen: undefined;
    AnalyzeScreen: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "AuthScreen">;

export const getUVGradient = (uv: number): [string, string, string] => {
    if (uv <= 1) return ["#4CAF50", "#66BB6A", "#81C784"];
    if (uv <= 3) return ["#FFEB3B", "#FFC107", "#FF9800"];
    if (uv <= 5) return ["#FF9800", "#FF5722", "#F44336"];
    if (uv <= 7) return ["#F44336", "#D32F2F", "#C62828"];
    if (uv <= 9) return ["#C62828", "#B71C1C", "#880E4F"];
    return ["#880E4F", "#8B0000", "#800000"];
};

export default function Navbar() {
    const [uvIndex, setUvIndex] = useState<number | null>(null);
    const [showUVInfo, setShowUVInfo] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();

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

    return (
        <>
            <View style={styles.navbarContainer}>
                <Ionicons style={styles.icon} name="help-circle-outline" size={width * 0.1} color="white" onPress={() => navigation.navigate("FoodAndStressScreen")} />

                {uvIndex !== null && (
                    <TouchableOpacity onPress={() => setShowUVInfo(true)}>
                        <View style={styles.uvContainer}>
                            <View style={styles.uvIndicator}>
                                <LinearGradient colors={getUVGradient(uvIndex)} style={StyleSheet.absoluteFill} />
                            </View>
                            <Text style={styles.uvText}>UV {uvIndex}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <Ionicons style={styles.icon} name="camera" size={width * 0.1} color="white" onPress={() => navigation.navigate("UploadPhotoScreen")} />
                <Ionicons style={styles.icon} name="chatbubbles" size={width * 0.1} color="white" onPress={() => navigation.navigate("forum")} />
                <Ionicons style={styles.icon} name="person-circle-outline" size={width * 0.1} color="white" onPress={() => navigation.navigate("profile")} />
                <Ionicons style={styles.icon} name="exit" size={width * 0.1} color="white" onPress={() => navigation.navigate("AuthScreen")} />
            </View>

            {showUVInfo && uvIndex !== null && (
                <UVBar uvIndex={uvIndex} onClose={() => setShowUVInfo(false)} />
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
});