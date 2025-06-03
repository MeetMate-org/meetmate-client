import { INotification } from "./isubscribe";

export interface User {
  id: string;
  email: string;
  username: string;
  role?: string;
  notifications?: INotification[];
  freeTime?: {
    [day: string]: { start: string; end: string }[];
  }
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

export interface Slot {
  freeTime: {
    mon: { start: string; end: string }[];
    tue: { start: string; end: string }[];
    wed: { start: string; end: string }[];
    thu: { start: string; end: string }[];
    fri: { start: string; end: string }[];
    sat: { start: string; end: string }[];
    sun: { start: string; end: string }[];
  };
}