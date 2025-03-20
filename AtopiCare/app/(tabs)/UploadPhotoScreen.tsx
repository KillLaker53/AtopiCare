import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function UploadPhotoScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
      <Text style={styles.title}>Upload Your Photo</Text>

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={80} color="#fff" />
          <Text style={styles.placeholderText}>No Image Selected</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
        <LinearGradient colors={["#ff416c", "#ff4b2b"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
        <LinearGradient colors={["#36d1dc", "#5b86e5"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </LinearGradient>
          </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
        <LinearGradient colors={["#36d1dc", "#5b86e5"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Analize</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    width: "80%",
    marginBottom: 15,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
