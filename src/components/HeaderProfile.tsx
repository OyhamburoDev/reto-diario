import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getText } from "../firebase/notes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { getUserData } from "../firebase/profile";
import type { PerfilUsuario } from "../screens/EditarPerfilScreen";
import { colors } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);

  const [profile, setProfile] = useState<Partial<PerfilUsuario>>({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const respuesta = await getUserData(uid);
        if (respuesta) {
          setProfile(respuesta);
        }
      } catch (err) {
        console.error(err);
      }
    };
    traerDatos();
  }, []);

  return (
    <View style={styles.profileHeader}>
      <ImageBackground
        source={require("../../assets/images/fondo-profile-user.jpg")}
        resizeMode="cover"
        style={styles.cardTop}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* Botón de configuración arriba a la derecha */}
        <Pressable
          style={styles.settingsButton}
          onPress={() => navigation.navigate("EditarPerfil")}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
        </Pressable>

        {/* Foto de perfil */}
        <View style={styles.avatarContainer}>
          <Image
            source={
              profile.base
                ? { uri: `data:image/jpeg;base64,${profile.base}` }
                : require("../../assets/images/avatar-placeholder.jpg")
            }
            style={styles.avatarImage}
          />
        </View>

        {/* Nombre y bio */}
        <View style={styles.nameBio}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileBio}>{profile.biografia}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    marginBottom: 20,
  },
  cardTop: {
    position: "relative",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "rgba(0, 191, 255, 0.34)",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  settingsButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  nameBio: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: colors.text,
  },
  profileBio: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: colors.text,
    textAlign: "center",
    lineHeight: 18,
  },
});
