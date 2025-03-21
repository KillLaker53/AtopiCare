import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

type user = {
    id: string,
    name: string,
    role: string
}

const initialUsers: user[] = [
    { id: "1", name: "Person 1", role: "User" },
    { id: "2", name: "Person 2", role: "Admin" },
    { id: "3", name: "Person 3", role: "User" },
    { id: "4", name: "Person 4", role: "User" },
];

export default function AdminScreen() {
    const [users, setUsers] = useState(initialUsers);

    const changeRole = (id: string) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: user.role === "User" ? "Admin" : "User" } : user));
    };

    const deleteUser = (id: string) => {
        Alert.alert("Delete User", "Are you sure you want to delete this user?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => setUsers(users.filter(user => user.id !== id)), style: "destructive" },
        ]);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userRole}>{item.role}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => changeRole(item.id)} style={styles.roleButton}>
                    <Ionicons name="swap-horizontal" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
                    <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
            <Navbar />
            <Text style={styles.title}>User Management</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.08,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        color: "#99ddff",
        textAlign: "center",
        marginBottom: height * 0.05,
        marginTop: height * 0.11
    },
    listContainer: {
        paddingHorizontal: width * 0.05,
    },
    userCard: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userName: {
        color: "white",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    userRole: {
        color: "#99ddff",
        fontSize: width * 0.04,
    },
    actions: {
        flexDirection: "row",
        gap: 10,
    },
    roleButton: {
        backgroundColor: "#007AFF",
        padding: 8,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: "#ff3b30",
        padding: 8,
        borderRadius: 8,
    },
});
