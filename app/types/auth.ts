export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
}

export interface AuthResponse {
  token: string;
  shortId: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  activeTab: 'dashboard' | 'board';
} 