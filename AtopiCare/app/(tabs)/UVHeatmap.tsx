import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { useState } from "react";

export default function LeafletMap(){
    const webViewRef = useRef(null);
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        fetchUVData();
    }, []);

    const fetchUVData = async () => {
        try {
          const response = await fetch("http://localhost:3000/uv-api/uv-index");
          const data = await response.json();

          const formattedData = data.map((item: { lat: number, lon: number, uvIndex: number }) => ({
            lat: item.lat,
            lon: item.lon,
            uvIndex: item.uvIndex
          }));

          setHeatmapData(formattedData);


          if (webViewRef.current) {
            (webViewRef.current as WebView).postMessage(JSON.stringify(formattedData));
          }
        } catch (error) {
            console.error("Error fetching UV data:", error);
        }
    };

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: "file:../../assets/leafletMap.html" }}
          style={styles.webview}
          onLoad={() => {
            if (heatmapData.length > 0 && webViewRef.current) {
              (webViewRef.current as WebView).postMessage(JSON.stringify(heatmapData));
            }
          }}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1 }
});

