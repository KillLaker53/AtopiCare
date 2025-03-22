import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { useState } from "react";
import axios from "axios";

export default function LeafletMap(){
    const webViewRef = useRef(null);
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        if (heatmapData.length > 0 && webViewRef.current) {
            (webViewRef.current as WebView).postMessage(JSON.stringify(heatmapData));
        }
    }, [heatmapData]);

    const fetchUVData = async () => {
    try {
        const response = await axios.get("http://10.0.2.2:3000/uv-api/uv-index");
        const data = response.data;

        setHeatmapData(data);

        if (webViewRef.current) {
            (webViewRef.current as WebView).postMessage(JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error fetching UV data:", error);
    }
};

    return (
      <View style={styles.container}>
          <WebView source={{ uri: "http://10.0.2.2:3000/public/leafletMap.html" }} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1 }
});

