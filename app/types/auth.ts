import { INotification } from "./isubscribe";

export interface User {
  id: string;
  email: string;
  username: string;
  role?: string;
  notifications?: INotification[];
}

export interface UserProfile {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  username: string;
  email: string;
}

export interface OtpVerifyResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  error?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  activeTab: 'dashboard' | 'board';
} 