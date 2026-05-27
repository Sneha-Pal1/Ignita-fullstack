export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export type UserRole = "ADMIN" | "USER" | "STUDENT";

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: Exclude<UserRole, "ADMIN">;
}

export interface AdminCreateCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  accessToken: any;
  access_token: string;
  refreshToken?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role?: UserRole;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface AdminCreateResponse {
  message: string;
  user?: User;
}
