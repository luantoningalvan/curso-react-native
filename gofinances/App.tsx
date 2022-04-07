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
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/App.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
