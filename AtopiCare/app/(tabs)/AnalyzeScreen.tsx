import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "@/components/ui/Navbar";

const { width, height } = Dimensions.get("window");

export default function AnalyzeScreen() {
  const [analyses, setAnalyses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/image/user/1");
        const data = await response.json();
        setAnalyses(data);
        setSelected(data[0]);
      } catch (err) {
        console.error("Failed to fetch analyses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, selected?.id === item.id && styles.cardSelected]}
      onPress={() => setSelected(item)}
    >
      <Image source={{ uri: `http://10.0.2.2:3000${item.imageUrl}` }} style={styles.thumb} />
      <View style={styles.cardText}>
        <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.statusTextSmall}>{item.classification}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
        <Navbar />
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Analysis</Text>

        {selected && (
          <View style={styles.analysisContainer}>
            <Text style={styles.date}>
              {new Date(selected.createdAt).toLocaleDateString()}
            </Text>

            <Image
              source={{
                uri: "https://cdn.altmeyers.org/media/W1siZiIsImltYWdlcy8yMDE3LzExLzI5LzEyLzI4LzU5Lzk3Y2YzMTdhLTc5OGItNDdiMy05ZTc1LWQ1NzkwMTQ5NjhiNy9Fa3plbSBtaWtyb2JpZWxsZXMuSlBHIl0sWyJwIiwidGh1bWIiLCIyMDB4MjAwIyJdLFsicCIsImJsdXJlZCIsMjBdLFsicCIsImVuY29kZSIsImpwZyJdLFsicCIsImpwZWdvcHRpbSJdXQ/file.jpg?sha=b366f6d4c8fa019f"
              }}
              style={styles.imagePlaceholder}
            />

            <Text style={styles.statusText}>STATUS: {selected.classification}</Text>

            <View style={styles.tipContainer}>
              <Ionicons name="alert-circle" size={30} color="#FF9800" />
              <Text style={styles.tipText}>Tip: {selected.tip}</Text>
            </View>
          </View>
        )}

        <Text style={styles.subTitle}>Previous Analyses</Text>

        <FlatList
          data={analyses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 15,
    alignSelf: "flex-start",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    alignItems: "center",
    width: width - 40,
  },
  cardSelected: {
    borderColor: "#00BCD4",
    borderWidth: 2,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardText: {
    marginLeft: 10,
  },
  dateText: {
    color: "#fff",
    fontSize: 14,
  },
  statusTextSmall: {
    color: "#fff",
    fontSize: 12,
    fontStyle: "italic",
  },
  analysisContainer: {
    width: width - 40,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: width * 0.7,
    height: height * 0.4,
    borderRadius: 15,
    backgroundColor: "#3F51B5",
    marginBottom: 15,
  },
  date: {
    color: "white",
    alignSelf: "flex-end",
    fontSize: width * 0.04,
    fontFamily: "monospace",
    paddingBottom: 10,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  tipText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
    flexShrink: 1,
  },
});
