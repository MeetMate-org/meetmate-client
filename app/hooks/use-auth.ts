import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { getUserById, login } from '@/app/api/auth';
import { useAuthStore } from '../store/use-auth-store';
import { LoginResponse } from '../types/auth';

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setError, setLoading } = useAuthStore();

  const handleLogin = async (identifier: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await login(identifier, password);
      console.log(response);
      
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.userId);

      const user = await getUserById(response.token, response.userId);
      
      if (user) {
        setUser({
          id: response.userId,
          email: user.email || '',
          name: user.name || '',
          role: user.role || 'user'
        });
        router.push("/home");
        return { success: true };
      } else {
        const errorMessage = "Користувача не знайдено. Спробуйте ще раз.";
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
    localStorage.removeItem("id");
    setUser(null);
    router.push("/auth/login");
  }, [router, setUser]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      router.push("/auth/login");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (!token || !id) {
        router.push("/auth/login");
        return;
      }

      setLoading(true);
      try {
        const userData = await getUserById(token, id);
        if (userData) {
          setUser({
            id: id,
            email: userData.email || '',
            name: userData.name || '',
            role: userData.role || 'user'
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
  }, [router, handleLogout, setUser, setError, setLoading]);

  return {
    handleLogin,
    handleLogout,
    checkAuth
  };
}; 