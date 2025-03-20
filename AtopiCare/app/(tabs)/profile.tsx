import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Atopic Dermatitis Advocate | Skincare Enthusiast",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Button title="Edit Profile" onPress={() => alert("Edit Profile Clicked")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
});
