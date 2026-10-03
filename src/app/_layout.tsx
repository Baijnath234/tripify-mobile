import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useEffect } from "react";

import { store } from "../redux/store";
import { initializeAuth } from "../redux/authBootstrap";
import { useAppSelector } from "../redux/hooks";

function AppNavigation() {
  const {
    isAuthenticated,
    initialized,
  } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    initializeAuth(store.dispatch);
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#F8FAFC",
        },
      }}
    >
      <Stack.Protected
        guard={!isAuthenticated}
      >
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected
        guard={isAuthenticated}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="destinations/[id]" />
        <Stack.Screen name="itinerary-builder" />
        <Stack.Screen name="itinerary/[id]" />
        <Stack.Screen name="guides" />
        <Stack.Screen name="blog" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <StatusBar style="dark" />
    </Provider>
  );
}