import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "react-native";
import { AuthProvider } from "./src/hooks/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoader] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoader) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
