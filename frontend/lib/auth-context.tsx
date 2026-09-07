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

// Auth context state interface exposed across the entire client application
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

  // Synchronizes state with latest user profile in localStorage
  const refreshUser = () => {
    const storedUser = authStorage.getUser();
    setUser(storedUser);
  };

  // Logout handler: Clears JWT tokens from storage and dispatches change event
  const logout = () => {
    authStorage.removeToken();
    authStorage.removeUser();
    setUser(null);
    // Emit auth change event to notify components in the current tab
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"));
    }
  };

  useEffect(() => {
    // 1. Check existing session on initial application mount
    const storedUser = authStorage.getUser();
    setUser(storedUser);
    setIsLoading(false);

    // 2. Cross-tab synchronization: Updates state if user logs in/out from another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_user" || e.key === "auth_token") {
        const updatedUser = authStorage.getUser();
        setUser(updatedUser);
      }
    };

    // 3. Same-tab event listener for seamless UI reactivity on login/logout
    const handleAuthChange = () => {
      const updatedUser = authStorage.getUser();
      setUser(updatedUser);
    };

    // Small delay to ensure localStorage write finishes before state read
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

// Custom hook to consume authentication state anywhere in React components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}

