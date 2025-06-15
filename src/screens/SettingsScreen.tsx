import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});
