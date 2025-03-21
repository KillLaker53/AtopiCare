import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

export default function UploadPhotoScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [classificationResult, setClassificationResult] = useState<{ class: string; confidence: number } | null>(null);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setClassificationResult(null); // Reset result when new image is selected
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
      setClassificationResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please upload or take a photo first.");
      return;
    }

    setUploading(true);

    try {
      if (typeof FormData === "undefined") {
        throw new Error("FormData is not supported in this environment.");
      }

      let formData = new FormData();

      if (Platform.OS === "web") {
        // Web: Convert URI to Blob
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append("file", new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" }));
      } else {
        // Mobile (iOS & Android)
        formData.append("file", {
          uri: selectedImage,
          name: `photo-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      console.log("Sending Image to Backend:", formData);

      const response = await fetch("http://localhost:3000/image/upload", {
        method: "POST",
        body: formData,
        headers: {
          ...(Platform.OS === "web" ? {} : { "Content-Type": "multipart/form-data" }), // Remove Content-Type for Web
        },
      });

      console.log("📥 Response Status:", response.status);

      const result = await response.json();

      //Log the SageMaker Response
      console.log("📊 SageMaker Response:", result);

      if (response.ok) {
        setClassificationResult({
          class: result.classification?.classification || "Unknown",
          confidence: result.classification?.confidence || 0,
        });
      } else {
        Alert.alert("Error", result.error || "Failed to analyze image.");
      }
    } catch (error) {
      console.error("Error sending image:", error);
      Alert.alert("Error", "Failed to send image. Check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
      <Navbar uvIndex={5} />
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

      <TouchableOpacity style={styles.button} onPress={analyzeImage} disabled={uploading}>
        <LinearGradient colors={["#36d1dc", "#5b86e5"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>{uploading ? "Uploading..." : "Analyze"}</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/*Display the classification result */}
      {classificationResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>🧪 Classification: {classificationResult.class}</Text>
          <Text style={styles.resultText}>📊 Confidence: {(classificationResult.confidence * 100).toFixed(2)}%</Text>
        </View>
      )}
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
    marginTop: height * 0.05,
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
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
