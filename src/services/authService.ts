import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const registerApi = async (
  data: RegisterRequest
): Promise<User> => {
  const response = await api.post<User>(
    "/auth/register",
    data
  );

  return response.data;
};

export const getCurrentUserApi = async (
  token: string
): Promise<User> => {
  const response = await api.get<User>(
    "/users/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};