import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const AUTH_USER_KEY = "tripify_auth_user";
const AUTH_TOKEN_KEY = "tripify_access_token";

export async function getStoredUser(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(AUTH_USER_KEY);
  }

  return SecureStore.getItemAsync(AUTH_USER_KEY);
}

export async function storeUser(
  user: string
): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(AUTH_USER_KEY, user);
    return;
  }

  await SecureStore.setItemAsync(
    AUTH_USER_KEY,
    user
  );
}

export async function removeStoredUser(): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(AUTH_USER_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(
    AUTH_USER_KEY
  );
}

export async function getStoredToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

export async function storeToken(
  token: string
): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(
      AUTH_TOKEN_KEY,
      token
    );
    return;
  }

  await SecureStore.setItemAsync(
    AUTH_TOKEN_KEY,
    token
  );
}

export async function removeStoredToken(): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(
    AUTH_TOKEN_KEY
  );
}

export async function clearAuthStorage(): Promise<void> {
  await Promise.all([
    removeStoredUser(),
    removeStoredToken(),
  ]);
}