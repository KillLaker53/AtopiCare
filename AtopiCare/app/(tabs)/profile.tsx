import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const deleteUser = (id: string) => {
    Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this user?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => console.log(`User ${id} deleted`) },
        ]
    );
  };

  return (
      <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
        <Navbar uvIndex={3} />

        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <Ionicons name="person-circle-outline" size={width * 0.25} color="white" style={styles.profileIcon} />

            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={22} color="white" />
              <Text style={styles.infoText}>John Doe</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="at-outline" size={22} color="white" />
              <Text style={styles.infoText}>johndoe</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={22} color="white" />
              <Text style={styles.infoText}>johndoe@email.com</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="lock-closed-outline" size={22} color="white" />
              <Text style={styles.infoText}>********</Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteUser("example")} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.historyTitle}>YOUR HISTORY:</Text>
          <View style={styles.photosContainer}>
            {[...Array(6)].map((_, index) => (
                <View key={index} style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={80} color="white" />
                </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141E30",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: height * 0.1,
    marginTop: height * 0.12,
  },
  profileCard: {
    width: width * 0.9,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  profileIcon: {
    marginBottom: height * 0.02,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  infoText: {
    marginLeft: 10,
    fontSize: width * 0.045,
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    marginTop: height * 0.03,
    gap: 15,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#007AFF",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  editButtonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 25,
    shadowColor: "#ff3b30",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: width * 0.07,
    marginTop: height * 0.1,
  },
  imagePlaceholder: {
    width: width * 0.35,
    height: height * 0.2,
    borderRadius: 15,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  historyTitle: {
    fontFamily: "Monaco",
    fontWeight: "bold",
    fontSize: width * 0.07,
    color: "white",
    marginTop: height * 0.1,
  },
});