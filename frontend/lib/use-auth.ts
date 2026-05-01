"use client";

import { useState, useCallback } from "react";
import { authAPI } from "./auth";
import { APIError } from "./api-client";
import type { LoginCredentials, RegisterCredentials, User } from "./auth-types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user || null);
      return response;
    } catch (err) {
      const message = err instanceof APIError ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(credentials);
      setUser(response.user || null);
      return response;
    } catch (err) {
      const message =
        err instanceof APIError ? err.message : "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
    setError(null);
  }, []);

  return {
    login,
    register,
    logout,
    loading,
    error,
    user,
    isAuthenticated: authAPI.isAuthenticated(),
  };
}
