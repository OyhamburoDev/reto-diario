import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { colors } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons"; // O el ícono que uses
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  descripcion: string;
  tipo: string;
  onPress: () => void;
  onCambiar: () => void;
};

export default function CardDesafio({
  descripcion,
  onPress,
  onCambiar,
  tipo,
}: Props) {
  const getIconName = (tipo: string) => {
    switch (tipo) {
      case "foto":
        return "camera";
      case "ubicacion":
        return "location";
      case "texto":
        return "document-text";
      case "audio":
        return "mic";
      default:
        return "star";
    }
  };

  return (
    <View style={styles.card}>
      {/* Fondo superior con imagen */}
      <ImageBackground
        source={require("../../assets/images/fondo-card.jpg")}
        resizeMode="cover"
        style={styles.cardTop}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <Ionicons
          name={getIconName(tipo)}
          size={60}
          color={colors.primary}
          style={styles.icon}
        />
      </ImageBackground>

      {/* Parte inferior */}
      <View style={styles.cardBottom}>
        <Text style={styles.texto}>{descripcion}</Text>

        <Pressable onPress={onPress}>
          <LinearGradient
            colors={["#00BFFF", "#1E90FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botonGradiente}
          >
            <Text style={styles.botonTexto}>¡HACER RETO!</Text>
          </LinearGradient>
        </Pressable>

        <Pressable onPress={onCambiar}>
          <Text style={styles.botonCambiar}>Cambiar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    backgroundColor: colors.card,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardTop: {
    width: "100%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBottom: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.card,
  },
  icon: {
    marginBottom: 0,
  },
  texto: {
    color: colors.text,
    fontSize: 19,
    textAlign: "center",
    marginBottom: 20,
  },
  botonGradiente: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  botonTexto: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  botonCambiar: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
