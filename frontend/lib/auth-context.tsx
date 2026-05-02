"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User } from "./auth-types";
import { authStorage } from "./auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = () => {
    const storedUser = authStorage.getUser();
    setUser(storedUser);
  };

  const logout = () => {
    authStorage.removeToken();
    authStorage.removeUser();
    setUser(null);
    // Emit auth change event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"));
    }
  };

  useEffect(() => {
    // Check user on mount
    const storedUser = authStorage.getUser();
    setUser(storedUser);
    setIsLoading(false);

    // Listen for storage changes (login from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_user" || e.key === "auth_token") {
        const updatedUser = authStorage.getUser();
        setUser(updatedUser);
      }
    };

    // Custom event for same-tab changes
    const handleAuthChange = () => {
      const updatedUser = authStorage.getUser();
      setUser(updatedUser);
    };

    // Add small delay to ensure localStorage is updated
    const timer = setTimeout(() => {
      const storedUser = authStorage.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    }, 100);

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleAuthChange as EventListener);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "auth-change",
        handleAuthChange as EventListener,
      );
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
