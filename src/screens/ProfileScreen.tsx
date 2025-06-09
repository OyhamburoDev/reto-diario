import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types"; // o el path correcto
import { SafeAreaView } from "react-native-safe-area-context";
import PhotosProfile from "../components/PhotosProfile";
import LocationProfile from "../components/LocationProfile";
import NotesProfile from "../components/NotesProfile";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff0f5" }}>
      <ScrollView style={styles.container}>
        {/* HEADER DE PERFIL */}
        <View style={styles.profileHeader}>
          <View style={styles.profilePicPlaceholder}>
            <Text style={styles.profileInitials}>👤</Text>
          </View>
          <Text style={styles.profileName}>Ramiro Oyhamburo</Text>
          <Text style={styles.profileBio}>
            Amante de los desafíos, viajero de emociones y buscador de retos
            🧠✨
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
        <PhotosProfile />

        {/* UBICACIONES */}
        <LocationProfile />

        {/* NOTAS */}
        <NotesProfile />
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 10,
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
});
