import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./src/navigation/TabsNavigator";
import DesafioScreen from "./src/screens/DesafioScreen";
import CamaraScreen from "./src/screens/CamaraScreen";
import LocationScreen from "./src/screens/LocationScreen";
import { RootStackParamList } from "./src/navigation/types";
import EditarPerfilScreen from "./src/screens/EditarPerfilScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f78fb3", // rosa pastel
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
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
