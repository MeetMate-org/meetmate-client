"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { useAuthStore } from '../store/use-auth-store';
import { AuthResponse, LoginResponse, User } from '../types/auth';
import { useLogin } from '../api/auth';
import { QueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setError, setLoading } = useAuthStore();
  const [queryClient] = useState(() => new QueryClient());
  
  const loginMutation = useLogin();
  
  const handleLogin = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const loginResponse: LoginResponse = await loginMutation.mutateAsync({ identifier, password });
  
      if (!loginResponse.success || loginResponse.error) {
        const errorMessage = loginResponse.error || "Невідома помилка під час авторизації";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
  
      // Авторизація пройшла успішно, зберігаємо дані в localStorage
      const authData: AuthResponse = loginResponse as unknown as AuthResponse;
      localStorage.setItem("token", authData.token);
      localStorage.setItem("userId", authData.userId);
  
      // Далі виконуватиметься запит для отримання даних користувача, якщо це потрібно
      const userData = await queryClient.fetchQuery<User>({
        queryKey: ['user', authData.userId],
        queryFn: async () => {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            throw new Error("API URL is not defined!");
          }
  
          const response = await fetch(`${apiUrl}/user/${authData.userId}`, {
            headers: {
              'x-access-token': authData.token,
            },
          });
  
          if (!response.ok) {
            throw new Error("Cannot get user data");
          }
  
          return response.json();
        }
      });
  
      if (userData) {
        // Зберігаємо дані користувача в стані
        setUser({
          id: authData.userId,
          email: userData.email || '',
          name: userData.name || '',
          role: userData.username || 'user',
        });
        router.push("/home");
        return { success: true };
      } else {
        const errorMessage = "The user was not found. Please try again.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
  
    } catch {
      const errorMessage = "Invalid credentials. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    router.push("/");
  }, [router, setUser]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.push("/");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        router.push("/auth/login");
        return;
      }

      setLoading(true);
      try {
        const userData = await queryClient.fetchQuery<User>({
          queryKey: ['user', userId],
          queryFn: async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
              throw new Error("API URL is not defined!");
            }
            
            const response = await fetch(`${apiUrl}/user/${userId}`, {
              headers: {
                'x-access-token': token,
              }
            });
            
            if (!response.ok) {
              throw new Error("Unable to retrieve user data");
            }
            
            return response.json();
          }
        });
        
        if (userData) {
          setUser({
            id: userId,
            email: userData.email || '',
            name: userData.name || '',
            role: userData.username || 'user' 
          });
        } else {
          setError("User not found.");
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("User data could not be loaded.");
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [router, handleLogout, setUser, setError, setLoading, queryClient]);

  return {
    handleLogin,
    handleLogout,
    checkAuth
  };
};
