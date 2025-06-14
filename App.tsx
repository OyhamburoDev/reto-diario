import React, { useState } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { RootState } from "./src/store";

function MainNavigator() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <NavigationContainer>
      {user.uid ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Podés mostrar un <Loading /> si querés
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
