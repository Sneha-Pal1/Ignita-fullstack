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
    const { rememberMe, ...loginData } = credentials;
    console.log("🔐 Attempting login with:", loginData.email);

    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      loginData,
    );

    console.log("📨 Login response received:", {
      hasAccessToken: !!response.accessToken,
      tokenLength: response.accessToken?.length,
      tokenPreview: response.accessToken
        ? response.accessToken.substring(0, 20) + "..."
        : "NO TOKEN",
      hasUser: !!response.user,
      user: response.user,
    });

    if (response.accessToken) {
      authStorage.setToken(response.accessToken);
      console.log("✅ Token saved to localStorage");

      if (response.user) {
        authStorage.setUser(response.user);
        console.log("✅ User saved to localStorage");
      }
      // Emit auth change event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-change"));
      }
    } else {
      console.error("❌ No accessToken in response!");
    }
    return response;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      credentials,
    );
    if (response.accessToken) {
      authStorage.setToken(response.accessToken);
      if (response.user) {
        authStorage.setUser(response.user);
      }
      // Emit auth change event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-change"));
      }
    }
    return response;
  },

  logout: () => {
    authStorage.clear();
    // Emit auth change event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"));
    }
  },

  isAuthenticated: () => {
    return !!authStorage.getToken();
  },

  getCurrentUser: () => {
    return authStorage.getUser();
  },
};
