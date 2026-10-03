import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_URL is not defined");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const { getStoredToken } = await import(
        "../utils/authStorage"
      );

      const token = await getStoredToken();

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Failed to attach auth token:",
        error
      );
    }

    return config;
  }
);

export default api;