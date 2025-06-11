import React from "react";
import { Text, View, StyleSheet, Pressable, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getText } from "../firebase/notes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { getUserData } from "../firebase/profile";
import type { PerfilUsuario } from "../screens/EditarPerfilScreen";

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
      {/* <View style={styles.profilePicPlaceholder}>
        <Text style={styles.profileInitials}>👤</Text>
      </View> */}

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

      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileBio}>{profile.biografia}</Text>
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
  );
}

const styles = StyleSheet.create({
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

  avatarContainer: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
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
