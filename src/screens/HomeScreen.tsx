import { View, Text, StyleSheet, Pressable } from "react-native";
import { getRandomDesafio } from "../utils/getRandomDesafio";
import { useEffect, useState } from "react";
import { Desafio } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Inicio">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [desafio, setDesafio] = useState<Desafio | null>(null);

  useEffect(() => {
    const nuevoDesafio = getRandomDesafio();
    setDesafio(nuevoDesafio);
  }, []);

  if (!desafio) {
    return (
      <View style={styles.container}>
        <Text style={styles.descripcion}>Cargando desafío...</Text>
      </View>
    );
  }

  function changeDesafio() {
    const nuevoDesafio = getRandomDesafio();
    setDesafio(nuevoDesafio);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>💖 Desafío del día 💑</Text>
      <Text style={styles.descripcion}>{desafio.descripcion}</Text>

      <View style={styles.cntButton}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
          onPress={() => navigation.navigate("Desafio", { desafio })}
        >
          <Text style={styles.buttonText}>¡Quiero hacerlo!</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.buttonAlt,
            pressed && { opacity: 0.8 },
          ]}
          onPress={changeDesafio}
        >
          <Text style={styles.buttonText}>Cambiar desafío</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffeef2",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d6336c",
    marginBottom: 20,
    textAlign: "center",
  },
  descripcion: {
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    textAlign: "center",
    marginBottom: 30,
    borderColor: "#f78fb3",
    borderWidth: 2,
    shadowColor: "#f78fb3",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cntButton: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#f78fb3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonAlt: {
    backgroundColor: "#f3a683",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
