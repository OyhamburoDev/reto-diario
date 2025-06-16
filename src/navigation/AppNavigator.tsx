import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import DesafioScreen from "../screens/DesafioScreen";
import CamaraScreen from "../screens/CamaraScreen";
import LocationScreen from "../screens/LocationScreen";
import { RootStackParamList } from "./types";
import EditarPerfilScreen from "../screens/EditarPerfilScreen";
import NotesScreen from "../screens/NotesScreen";
import { colors } from "../theme/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Desafio" component={DesafioScreen} />
      <Stack.Screen name="Camara" component={CamaraScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
    </Stack.Navigator>
  );
}
