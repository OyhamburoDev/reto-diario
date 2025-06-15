import React from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const achievements = [
  {
    id: "1",
    name: "Primer reto",
    icon: require("../../assets/images/icon-one.png"),
  },
  {
    id: "2",
    name: "Ubicación",
    icon: require("../../assets/images/icon-two.png"),
  },
  {
    id: "3",
    name: "5 fotos",
    icon: require("../../assets/images/icon-three.png"),
  },
  {
    id: "4",
    name: "Racha x3",
    icon: require("../../assets/images/icon-two.png"),
  },
  {
    id: "5",
    name: "10 retos",
    icon: require("../../assets/images/icon-two.png"),
  },
];

export default function LogrosCarousel() {
  return (
    <ImageBackground
      source={require("../../assets/images/fondo-estrellado.jpg")} // o la que vos tengas
      resizeMode="cover"
      style={styles.container}
      imageStyle={{ borderRadius: 20 }}
    >
      <Text style={styles.title}>🛸 Tus logros</Text>

      {/* FlatList horizontal para mostrar los logros */}
      <FlatList
        data={achievements}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <LinearGradient
            colors={["#ff00ff", "#00bfff", "#ff2d95"]} // gradiente tipo neón
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardInner}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </LinearGradient>
        )}
      />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 24,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#00BFFF",
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: 100,
    height: 100,
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  cardGradient: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 16,
    padding: 3, // importante para que se vea el borde
  },

  cardInner: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
