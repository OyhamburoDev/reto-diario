import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getFotos } from "../firebase/photos";

const screenWidth = Dimensions.get("window").width;

export default function PhotosProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [fotos, setFotos] = useState<
    { id: string; base: string; descripcion: string }[]
  >([]);

  useEffect(() => {
    const fetchFotos = async () => {
      const resultado = await getFotos(uid);
      setFotos(resultado);
    };
    fetchFotos();
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>📸 Fotos</Text>
      <View style={styles.gridContainer}>
        {fotos.map((item) => (
          <Image
            key={item.id}
            source={{ uri: `data:image/jpeg;base64,${item.base}` }}
            style={styles.photoBox}
            resizeMode="cover"
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#d6336c",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    rowGap: 12,
    columnGap: 12,
  },
  photoBox: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 + 30,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
});
