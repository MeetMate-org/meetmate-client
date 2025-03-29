import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading })
})); 