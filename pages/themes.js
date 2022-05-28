import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = createContext();

export default function Themes() {
  const [theme, setTheme] = useState(themes.light);

  return (
    <ThemeContext.Provider value={theme}>
      <View style={styles.container}>
        <TextBar />
        <Button
          title="Go Dark"
          color="black"
          onPress={() => setTheme(themes.dark)}
        />
        <Button
          title="Go Light"
          color="green"
          onPress={() => setTheme(themes.light)}
        />
        <StatusBar style="auto" />
      </View>
    </ThemeContext.Provider>
  );
}

function TextBar() {
  return <ThemedTextBar />;
}

function ThemedTextBar() {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ fontSize: 25, color: theme.foreground, padding: 15 }}>
        Hello from React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
