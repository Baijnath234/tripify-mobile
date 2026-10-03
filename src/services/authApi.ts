import api from "./api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
};

export async function loginUser(
  data: LoginRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
}