import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStoredUser,
  storeUser,
  removeStoredUser,
} from "../utils/authStorage";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await getStoredUser();

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Failed to load auth session:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    const loggedInUser: User = {
      id: "user-001",
      name: "Tripify User",
      email: email.trim(),
    };

    await storeUser(
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return true;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
    };

    await storeUser(
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return true;
  };

  const logout = async () => {
    await removeStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}