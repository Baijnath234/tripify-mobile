import api from "./api";

export const testBackend = async () => {
  const response = await api.get("/health");

  console.log("Backend response:", response.data);

  return response.data;
};