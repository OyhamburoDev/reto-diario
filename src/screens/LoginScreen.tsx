import { Text, View, Alert, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/authTypes";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
      dispatch(loginUser({ email: user.email, uid: user.uid }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sessión</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Acceder" onPress={handleLogin} />
      <Text>No tienes cuenta?</Text>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#d6336c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
