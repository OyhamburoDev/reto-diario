import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { updateUserData } from "../firebase/profile";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getUserData } from "../firebase/profile";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditarPerfil"
>;

export type PerfilUsuario = {
  name: string;
  biografia: string;
  base: string | null;
};

export default function EditarPerfilScreen() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [perfilActual, setPerfilActual] = useState<PerfilUsuario>({
    name: "",
    biografia: "",
    base: null,
  });
  const [base, setBase] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [biografia, setBiografia] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const cargarDatos = async () => {
      const perfil = await getUserData(uid);

      if (perfil) {
        setPerfilActual(perfil);
        setBase(perfil.base);
        setName(perfil.name);
        setBiografia(perfil.biografia);
      }
    };
    cargarDatos();
  }, []);

  const confirmShipping = async () => {
    setModalVisible(false);

    const cambios: Partial<PerfilUsuario> = {};

    if (name !== perfilActual.name) {
      cambios.name = name;
    }

    if (biografia !== perfilActual.biografia) {
      cambios.biografia = biografia;
    }

    if (base !== perfilActual.base) {
      cambios.base = base;
    }

    if (Object.keys(cambios).length === 0) {
      Alert.alert("Sin cambios", "No hiciste ninguna modificación");
      return;
    }

    try {
      await updateUserData(uid, cambios);
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
        navigation.navigate("Tabs", { screen: "Perfil" });
      }, 1500);
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      Alert.alert("Error", "Hubo un problema al guardar los cambios.");
    }
  };

  // Pedir permisos para tomar foto
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setBase(asset.base64 || null);
    }
  };

  // Abrir el modal para guardar todos los cambios
  const handleGuardar = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={
            base
              ? { uri: `data:image/jpeg;base64,${base}` }
              : require("../../assets/images/avatar-placeholder.jpg")
          }
          style={styles.avatarImage}
        />
        <Pressable style={styles.cameraIcon} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color="#fff" />
        </Pressable>
      </View>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nombre"
      />
      <TextInput
        value={biografia}
        onChangeText={setBiografia}
        style={[styles.input, styles.textArea]}
        placeholder="Biografía"
      />

      <Pressable style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Pressable>

      {/* MODAL CORRECTO */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Seguro que querés confirmar los cambios?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButton} onPress={confirmShipping}>
              <Text style={styles.modalButtonText}>Sí</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showCheck && (
        <View style={styles.successOverlay}>
          <Ionicons name="checkmark-circle" size={100} color="#38ada9" />
          <Text style={styles.successText}>¡Cambios guardados!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeef2",
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: "#d6336c",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#d6336c",
    borderRadius: 12,
    padding: 6,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f8d7da",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "#d6336c",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#d6336c",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    backgroundColor: "#f78fb3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  modalCancel: {
    backgroundColor: "#f3a683",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  successText: {
    fontSize: 20,
    color: "#38ada9",
    marginTop: 12,
    fontWeight: "bold",
  },
});
