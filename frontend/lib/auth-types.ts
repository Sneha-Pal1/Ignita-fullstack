export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  access_token: string;
  user?: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
}
