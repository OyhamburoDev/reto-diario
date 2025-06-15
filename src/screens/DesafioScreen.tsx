import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../theme/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Desafio">;
type DesafioRouteProp = RouteProp<RootStackParamList, "Desafio">;

export default function DesafioScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DesafioRouteProp>();
  const { desafio } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎯 Desafío elegido:</Text>
      <Text style={styles.descripcion}>{desafio.descripcion}</Text>

      {desafio.tipo === "texto" && (
        <>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("Notes", {
                descripcion: desafio.descripcion,
              })
            }
          >
            <Text style={styles.buttonText}>Escribir texto</Text>
          </Pressable>
        </>
      )}

      {desafio.tipo === "foto" && (
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Camara", {
              descripcion: desafio.descripcion,
            })
          }
        >
          <Text style={styles.buttonText}>Sacar foto</Text>
        </Pressable>
      )}

      {desafio.tipo === "ubicacion" && (
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Location", {
              descripcion: desafio.descripcion,
            })
          }
        >
          <Text style={styles.buttonText}>Tomar ubicación</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d6336c",
    marginBottom: 16,
    textAlign: "center",
  },
  descripcion: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderColor: "#f78fb3",
    borderWidth: 1,
    shadowColor: "#f78fb3",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  input: {
    width: "100%",
    minHeight: 120,
    borderColor: "#f78fb3",
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    color: "#333",
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f78fb3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
