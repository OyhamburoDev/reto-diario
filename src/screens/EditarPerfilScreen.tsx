import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

export default function EditarPerfilScreen() {
  const [nombre, setNombre] = useState("Ramiro Oyhamburo");
  const [descripcion, setDescripcion] = useState(
    "Amante de los desafíos, viajero de emociones..."
  );

  const handleGuardar = () => {
    console.log("Nuevo nombre:", nombre);
    console.log("Nueva descripción:", descripcion);
    // Acá en el futuro podrías guardar en Firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <Pressable style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>Cambiar foto</Text>
      </Pressable>

      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        placeholder="Nombre"
      />
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        multiline
      />

      <Pressable style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Pressable>
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
});
