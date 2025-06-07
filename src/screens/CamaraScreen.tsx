import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { savePhoto } from "../firebase/photos";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

export default function CamaraScreen() {
  const [uri, setUri] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "Camara">>();
  const { descripcion } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setUri(asset.uri);
      setBase(asset.base64 || null);
    }
  };

  const handleEnviarFoto = () => {
    setModalVisible(true);
  };

  const confirmarEnvio = async () => {
    setModalVisible(false);

    if (base) {
      await savePhoto(base, descripcion);
    }

    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
      setUri(null);
      setBase(null);
      navigation.navigate("Tabs", { screen: "Inicio" });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {!base ? (
        <>
          <Ionicons
            name="camera"
            size={64}
            color="#d6336c"
            style={styles.icon}
          />
          <Text style={styles.text}>No hay foto aún...</Text>
          <Pressable style={styles.customButton} onPress={takePhoto}>
            <Text style={styles.customButtonText}>Tomar foto</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.text}>Foto tomada:</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${base}` }}
            style={styles.image}
          />
          <View style={styles.buttonGroup}>
            <Pressable style={styles.customButton} onPress={handleEnviarFoto}>
              <Text style={styles.customButtonText}>Enviar foto</Text>
            </Pressable>
            <View style={styles.space} />
            <Pressable style={styles.customButtonAlt} onPress={takePhoto}>
              <Text style={styles.customButtonText}>Cambiar por otra</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* MODAL CORRECTO */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Seguro que querés enviar esta foto?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButton} onPress={confirmarEnvio}>
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
          <Ionicons
            name="checkmark-circle"
            size={100}
            style={styles.checkIcon}
          />
          <Text style={styles.successText}>¡Foto enviada!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffeef2", // fondo romántico
  },
  icon: {
    marginBottom: 12,
    color: "#d6336c", // rosa fuerte
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#f78fb3", // rosa pastel
  },
  buttonGroup: {
    width: "100%",
    paddingHorizontal: 24,
  },
  space: {
    height: 10,
  },
  customButton: {
    backgroundColor: "#f78fb3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  customButtonAlt: {
    backgroundColor: "#f3a683",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
  },
  customButtonText: {
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
  checkIcon: {
    color: "#38ada9", // verde suave
  },
});
