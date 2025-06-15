import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getRandomDesafio } from "../utils/getRandomDesafio";
import { useEffect, useState } from "react";
import { Desafio } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/theme";
import CardDesafio from "../components/CardDesafio";
import LogrosCarousel from "../components/LogrosCarousel";

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
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Retto</Text>
        <View style={styles.cntSubtitle}>
          <Text style={styles.desafioText}>Desafío del día </Text>
          <Text style={styles.rachasText}>🔥 Racha: 3 días </Text>
        </View>

        <CardDesafio
          descripcion={desafio.descripcion}
          tipo={desafio.tipo}
          onPress={() => navigation.navigate("Desafio", { desafio })}
          onCambiar={changeDesafio}
        />

        <LogrosCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  scrollContainer: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    marginTop: 8,
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#00BFFF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cntSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  desafioText: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  rachasText: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text,
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
