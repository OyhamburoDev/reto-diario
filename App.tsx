import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
