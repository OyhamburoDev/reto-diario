import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getLocations } from "../firebase/location";
import { colors } from "../theme/theme";

export default function LocationProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [location, setLocation] = useState<
    { id: string; address: string; date?: string }[]
  >([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await getLocations(uid);
      setLocation(result);
    };
    fetchLocations();
  }, []);

  return (
    <>
      {location.map((item) => (
        <View key={item.id} style={styles.locationCard}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../../assets/images/location-icon.png")} // asegurate que exista
              style={styles.icon}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.mainAddress}>{item.address.split(",")[0]}</Text>
            <Text style={styles.subAddress}>
              {item.address.split(",").slice(1).join(",").trim()}
            </Text>
            <Text style={styles.timeText}>hace 2 horas</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: colors.primary,
    marginBottom: 10,
  },
  locationCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  iconWrapper: {
    marginRight: 12,
    paddingTop: 4,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: colors.primary,
  },
  textContent: {
    flex: 1,
  },
  mainAddress: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: colors.text,
  },
  subAddress: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  timeText: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
});
