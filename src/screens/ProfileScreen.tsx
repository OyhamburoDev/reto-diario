import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types"; // o el path correcto

const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fakePhotos = Array.from({ length: 9 }, (_, i) => ({
    id: i.toString(),
  }));

  return (
    <ScrollView style={styles.container}>
      {/* HEADER DE PERFIL */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicPlaceholder}>
          <Text style={styles.profileInitials}>👤</Text>
        </View>
        <Text style={styles.profileName}>Ramiro Oyhamburo</Text>
        <Text style={styles.profileBio}>
          Amante de los desafíos, viajero de emociones y buscador de retos 🧠✨
        </Text>
        <Pressable
          onPress={() => navigation.navigate("EditarPerfil")}
          style={{
            alignSelf: "center",
            backgroundColor: "#f78fb3",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Editar perfil
          </Text>
        </Pressable>
      </View>

      {/* FOTOS */}
      <Text style={styles.sectionTitle}>📸 Fotos</Text>
      <View style={styles.gridContainer}>
        {fakePhotos.map((item) => (
          <View key={item.id} style={styles.photoBox} />
        ))}
      </View>

      {/* UBICACIONES */}
      <Text style={styles.sectionTitle}>📍 Ubicaciones</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Buenos Aires, Argentina</Text>
        <Text style={styles.cardText}>Córdoba, Argentina</Text>
        <Text style={styles.cardText}>Rosario, Santa Fe</Text>
        <Text style={styles.cardText}>Mar del Plata</Text>
        <Text style={styles.cardText}>Villa La Angostura</Text>
        <Text style={styles.cardText}>San Martín de los Andes</Text>
      </View>

      {/* NOTAS */}
      <Text style={styles.sectionTitle}>📝 Notas</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          “Hoy vencí mi miedo y salí a caminar solo.”
        </Text>
        <Text style={styles.cardText}>
          “Amanecer hermoso mientras hacía el desafío #7.”
        </Text>
        <Text style={styles.cardText}>
          “Subí la foto más vergonzosa pero fue mi favorita.”
        </Text>
        <Text style={styles.cardText}>
          “Guardar esta ubicación fue como inmortalizar el momento.”
        </Text>
        <Text style={styles.cardText}>
          “Este reto me enseñó a frenar un segundo y disfrutar.”
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: "#ffeef2",
    borderRadius: 16,
  },
  profilePicPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f8d7da",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  profileInitials: {
    fontSize: 28,
    color: "#d6336c",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileBio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#d6336c",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  photoBox: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 + 30,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
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
