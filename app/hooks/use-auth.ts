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
  
  // Використання TanStack Query мутації для логіну
  const loginMutation = useLogin();
  
  const handleLogin = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // Виконуємо мутацію за допомогою mutateAsync
      const loginResponse: LoginResponse = await loginMutation.mutateAsync({ identifier, password });
      
      if (!loginResponse.success || loginResponse.error) {
        const errorMessage = loginResponse.error || "Невідома помилка під час авторизації";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      // Отримуємо токен і shortId з відповіді API (ми припускаємо, що вони повертаються,
      // але фактично тип LoginResponse їх не містить - це помилка апі чи типізації)
      const apiResponse = await loginMutation.mutateAsync({ identifier, password });
      // Трактуємо відповідь як AuthResponse, яка містить потрібні нам поля
      const authData: AuthResponse = apiResponse as unknown as AuthResponse;
      
      localStorage.setItem("token", authData.token);
      localStorage.setItem("shortId", authData.shortId);

      // Отримуємо деталі користувача через TanStack Query
      try {
        // Використовуємо TanStack Query для отримання даних користувача
        const userData = await queryClient.fetchQuery<User>({
          queryKey: ['user', authData.shortId],
          queryFn: async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
              throw new Error("API URL is not defined!");
            }
            
            const response = await fetch(`${apiUrl}/auth/getUserById?shortId=${authData.shortId}`, {
              headers: {
                'x-access-token': authData.token
              }
            });
            
            if (!response.ok) {
              throw new Error("Не вдалося отримати дані користувача");
            }
            
            return response.json();
          }
        });
        
        if (userData) {
          setUser({
            id: authData.shortId,
            email: userData.email || '',
            name: userData.name || '',
            role: userData.username || 'user'
          });
          router.push("/home");
          return { success: true };
        } else {
          const errorMessage = "Користувача не знайдено. Спробуйте ще раз.";
          setError(errorMessage);
          return { success: false, error: errorMessage };
        }
      } catch {
        const errorMessage = "Помилка отримання даних користувача";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch {
      const errorMessage = "Невірні облікові дані. Спробуйте ще раз.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("shortId");
    setUser(null);
    router.push("/auth/login");
  }, [router, setUser]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const shortId = localStorage.getItem("shortId");

    if (!token || !shortId) {
      router.push("/auth/login");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const shortId = localStorage.getItem("shortId");

      if (!token || !shortId) {
        router.push("/auth/login");
        return;
      }

      setLoading(true);
      try {
        // Отримуємо дані користувача через TanStack Query
        const userData = await queryClient.fetchQuery<User>({
          queryKey: ['user', shortId],
          queryFn: async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
              throw new Error("API URL is not defined!");
            }
            
            const response = await fetch(`${apiUrl}/auth/getUserById?shortId=${shortId}`, {
              headers: {
                'x-access-token': token
              }
            });
            
            if (!response.ok) {
              throw new Error("Не вдалося отримати дані користувача");
            }
            
            return response.json();
          }
        });
        
        if (userData) {
          setUser({
            id: shortId,
            email: userData.email || '',
            name: userData.name || '',
            role: userData.username || 'user' // Використовуємо username як role
          });
        } else {
          setError("Користувача не знайдено.");
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Не вдалося завантажити дані користувача.");
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
