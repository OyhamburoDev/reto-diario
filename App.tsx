import React, { useState } from "react";
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
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
