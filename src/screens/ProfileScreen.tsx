import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotosProfile from "../components/PhotosProfile";
import LocationProfile from "../components/LocationProfile";
import NotesProfile from "../components/NotesProfile";
import HeaderProfile from "../components/HeaderProfile";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff0f5" }}>
      <ScrollView style={styles.container}>
        {/* HEADER DE PERFIL */}
        <HeaderProfile />
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
});
