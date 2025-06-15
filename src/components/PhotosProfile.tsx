import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getFotos } from "../firebase/photos";
import { colors } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

export default function PhotosProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [fotos, setFotos] = useState<
    { id: string; base: string; descripcion: string }[]
  >([]);

  useEffect(() => {
    const fetchFotos = async () => {
      const resultado = await getFotos(uid);
      if (resultado && Array.isArray(resultado)) {
        // Clonamos y ordenamos por id descendente (más nuevas primero)
        const ordenadas = [...resultado].sort((a, b) =>
          b.id.localeCompare(a.id)
        );
        setFotos(ordenadas);
      }
    };
    fetchFotos();
  }, []);

  // Divide el array en chunks de 4
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const filas = chunkArray(fotos, 4);

  return (
    <View style={styles.gridContainer}>
      {filas.map((fila, filaIndex) => {
        const esUltimaFila = filaIndex === filas.length - 1;
        const faltan = 4 - fila.length;

        return (
          <View key={`fila-${filaIndex}`} style={styles.row}>
            {fila.map((item, colIndex) => (
              <Image
                key={`${filaIndex}-${colIndex}-${item.id}`}
                source={{ uri: `data:image/jpeg;base64,${item.base}` }}
                style={styles.photoBox}
                resizeMode="cover"
              />
            ))}

            {/* 🔧 Si es la última fila y le faltan fotos, rellenamos con invisibles */}
            {esUltimaFila &&
              Array.from({ length: faltan }).map((_, i) => (
                <View
                  key={`relleno-${i}`}
                  style={[styles.photoBox, { opacity: 0 }]}
                />
              ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "column",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  photoBox: {
    width: (screenWidth - 48) / 4,
    height: (screenWidth - 48) / 4,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
});
