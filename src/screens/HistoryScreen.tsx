import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getFotos } from "../firebase/photos";
import { getLocations } from "../firebase/location";
import { getText } from "../firebase/notes";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const screenWidth = Dimensions.get("window").width;

export default function HistoryScreen() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [desafios, setDesafios] = useState<
    {
      id: string;
      descripcion: string;
      date: string;
      tipo: "foto" | "ubicacion" | "texto";
    }[]
  >([]);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const fotos = await getFotos(uid);
        const ubicaciones = await getLocations(uid);
        const textos = await getText(uid);

        const todos = [...fotos, ...ubicaciones, ...textos];

        todos.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setDesafios(todos);
      } catch (error) {
        console.error("Error al traer los desafíos:", error);
      }
    };

    fetchDesafios();
  }, [uid]);

  const getCardStyle = (tipo: string) => {
    switch (tipo) {
      case "foto":
        return { backgroundColor: "#fce4ec", icon: "camera" }; // rosa claro
      case "ubicacion":
        return { backgroundColor: "#e0f7fa", icon: "location" }; // celeste pastel
      case "texto":
        return { backgroundColor: "#f3e5f5", icon: "pencil" }; // lavanda suave
      default:
        return { backgroundColor: "#f5f5f5", icon: "alert" };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={desafios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item, index }) => {
          const { backgroundColor, icon } = getCardStyle(item.tipo);
          const alignLeft = index % 2 === 0;
          return (
            <View style={styles.timelineContainer}>
              {index !== 0 && <View style={styles.connectorLine} />}
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor,
                    alignSelf: alignLeft ? "flex-start" : "flex-end",
                  },
                ]}
              >
                <Ionicons name={icon as any} size={24} style={styles.icon} />
                <Text style={styles.desc}>{item.descripcion}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  timelineContainer: {
    position: "relative",
    marginBottom: 30,
    justifyContent: "center",
  },
  connectorLine: {
    position: "absolute",
    top: -15,
    left: "50%",
    width: 2,
    height: 30,
    backgroundColor: "#f78fb3", // rosa pastel para la línea
    transform: [{ translateX: -1 }],
    zIndex: -1,
  },
  item: {
    padding: 14,
    borderRadius: 12,
    maxWidth: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    color: "#d6336c", // rosa fuerte
  },
  desc: {
    fontSize: 16,
    color: "#4a4a4a", // gris oscuro suave
    flexShrink: 1,
  },
});
