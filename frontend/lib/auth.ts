import { apiClient } from "./api-client";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "./auth-types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },
};

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
    );
    if (response.access_token) {
      authStorage.setToken(response.access_token);
      if (response.user) {
        authStorage.setUser(response.user);
      }
    }
    return response;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      credentials,
    );
    if (response.access_token) {
      authStorage.setToken(response.access_token);
      if (response.user) {
        authStorage.setUser(response.user);
      }
    }
    return response;
  },

  logout: () => {
    authStorage.clear();
  },

  isAuthenticated: () => {
    return !!authStorage.getToken();
  },

  getCurrentUser: () => {
    return authStorage.getUser();
  },
};
