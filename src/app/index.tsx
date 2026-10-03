import { Redirect } from "expo-router";
import {
  ActivityIndicator,
  View,
} from "react-native";

import { useAppSelector } from "../redux/hooks";

export default function Index() {
  const {
    isAuthenticated,
    initialized,
  } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8FAFC",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#10B981"
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/destinations" />;
}