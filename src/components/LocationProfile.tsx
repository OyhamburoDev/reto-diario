import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getLocations } from "../firebase/location";

export default function LocationProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [location, setLocation] = useState<{ id: string; address: string }[]>(
    []
  );

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await getLocations(uid);
      setLocation(result);
    };
    fetchLocations();
  }, []);

  return (
    <>
      <Text style={styles.sectionTitleDos}>📍 Ubicaciones</Text>
      <View style={styles.card}>
        {location.map((item) => (
          <Text key={item.id} style={styles.cardText}>
            {item.address}
          </Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitleDos: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#d6336c",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
});
