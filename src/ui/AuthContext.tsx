import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../domain/entities/User";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, user: string) => {
    setToken(token);
    setUser(user as unknown as User);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
