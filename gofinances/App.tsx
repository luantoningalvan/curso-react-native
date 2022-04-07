import React from "react";
import { ThemeProvider } from "styled-components";
import { Home } from "./src/screens/Dashboard";
import { Register } from "./src/screens/Register";
import AppLoading from "expo-app-loading";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

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
      <Register />
    </ThemeProvider>
  );
}
