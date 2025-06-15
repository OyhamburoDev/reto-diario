import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GradientIcon from "../components/GradientIcon";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#0d0d0d",
          borderTopColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          height: 80,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Poppins_600SemiBold",
          marginBottom: 10,
          marginTop: 2,
        },
        tabBarActiveTintColor: "#00BFFF",
        tabBarInactiveTintColor: "#777777", // todos del mismo color
        tabBarIcon: ({ size }) => {
          let iconName: "home" | "person" | "time" | "settings" = "home";

          if (route.name === "Inicio") iconName = "home";
          else if (route.name === "Perfil") iconName = "person";
          else if (route.name === "Historial") iconName = "time";
          else if (route.name === "Configuración") iconName = "settings";

          return <GradientIcon name={iconName} size={25} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Historial" component={HistoryScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
