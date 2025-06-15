import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotosProfile from "../components/PhotosProfile";
import LocationProfile from "../components/LocationProfile";
import NotesProfile from "../components/NotesProfile";
import HeaderProfile from "../components/HeaderProfile";
import { colors } from "../theme/theme";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"fotos" | "notas" | "ubicaciones">(
    "fotos"
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={styles.container}>
        {/* HEADER DE PERFIL */}
        <HeaderProfile />

        {/* TABS DE SELECCIÓN */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab("fotos")}
            style={[
              styles.tabButton,
              activeTab === "fotos" && styles.tabButtonActive,
            ]}
          >
            <Text style={styles.tabText}>Fotos</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("notas")}
            style={[
              styles.tabButton,
              activeTab === "notas" && styles.tabButtonActive,
            ]}
          >
            <Text style={styles.tabText}>Notas</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("ubicaciones")}
            style={[
              styles.tabButton,
              activeTab === "ubicaciones" && styles.tabButtonActive,
            ]}
          >
            <Text style={styles.tabText}>Ubicaciones</Text>
          </Pressable>
        </View>

        {/* COMPONENTES CONDICIONALES */}
        {activeTab === "fotos" && (
          <View style={styles.sectionContainer}>
            <PhotosProfile />
          </View>
        )}

        {activeTab === "notas" && (
          <View style={styles.sectionContainer}>
            <NotesProfile />
          </View>
        )}

        {activeTab === "ubicaciones" && (
          <View style={styles.sectionContainer}>
            <LocationProfile />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  sectionContainer: {
    marginTop: 24,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
});
