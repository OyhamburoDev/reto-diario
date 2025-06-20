import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { saveText } from "../firebase/notes";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../theme/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Notes">;

export default function NotesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [text, setText] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const uid = useSelector((state: RootState) => state.user.uid);
  const route = useRoute<RouteProp<RootStackParamList, "Notes">>();
  const { descripcion } = route.params;

  const handleSendText = () => {
    setModalVisible(true);
  };

  const handleText = async () => {
    setModalVisible(false);
    if (text) {
      await saveText(uid, text, descripcion);
    }
    setShowCheck(true);

    setTimeout(() => {
      setShowCheck(false);
      setText("");
      navigation.navigate("Tabs", { screen: "Inicio" });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribí tu respuesta"
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
      />

      <Pressable style={styles.button} onPress={handleSendText}>
        <Text style={styles.buttonText}>Enviar nota</Text>
      </Pressable>

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
            <Pressable style={styles.btn} onPress={handleText}>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background,
  },

  input: {
    width: "100%",
    minHeight: 120,
    borderColor: "#f78fb3",
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    color: "#333",
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f78fb3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
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
