import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { saveLocation } from "../firebase/location";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Location">;

export default function LocationScreen() {
  const [address, setAddress] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Location">>();
  const { descripcion } = route.params;
  const uid = useSelector((state: RootState) => state.user.uid);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos acceso a la ubicación");
      }
    })();
  }, []);

  const takeLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const [addr] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const texrAddress = `${addr.street}, ${addr.district}, ${addr.city}, ${addr.region}, ${addr.country}`;
    setAddress(texrAddress);
  };

  const handleSendLocation = () => {
    setModalVisible(true);
  };

  const confirmarEnvio = async () => {
    setModalVisible(false);

    if (address) {
      await saveLocation(uid, address, descripcion);
    }

    setShowCheck(true);

    setTimeout(() => {
      setShowCheck(false);
      setAddress(null);
      navigation.navigate("Tabs", { screen: "Inicio" });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {!address ? (
        <>
          <Ionicons
            name="location-sharp"
            size={40}
            color="#f78fb3"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.text}>No hay ubicación aún...</Text>
          <Pressable style={styles.button} onPress={takeLocation}>
            <Text style={styles.buttonText}>Obtener ubicación</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.text}>Ubicación obtenida:</Text>
          <Ionicons
            name="location-sharp"
            size={40}
            color="#38ada9"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.addressText}>{address}</Text>
          <View style={styles.buttonGroup}>
            <Pressable style={styles.button} onPress={handleSendLocation}>
              <Text style={styles.buttonText}>Enviar ubicación</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.altButton]}
              onPress={takeLocation}
            >
              <Text style={styles.buttonText}>Cambiar por otra</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* MODAL */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Seguro que querés enviar esta ubicación?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.btn} onPress={confirmarEnvio}>
              <Text style={styles.btnText}>Sí</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.cancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showCheck && (
        <View style={styles.successOverlay}>
          <Ionicons name="checkmark-circle" size={100} color="#38ada9" />
          <Text style={styles.successText}>¡Ubicación enviada!</Text>
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
    backgroundColor: "#ffeef2",
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  addressText: {
    marginTop: 12,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f78fb3",
  },
  buttonGroup: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#f78fb3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  altButton: {
    backgroundColor: "#f8a5c2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
  btn: {
    backgroundColor: "#f78fb3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancel: {
    backgroundColor: "#aaa",
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
