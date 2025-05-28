"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuthStore } from "../store/use-auth-store";
import { AuthResponse, LoginResponse, User } from "../types/auth";
import {
  useLogin,
  useSignup,
  useVerifyOtp,
  useResendOtp,
  // useGetUserProfile,
  // useUpdateProfile,
  useChangePassword,
  useRequestPasswordReset,
  useResetPassword,
} from  "../services/auth-services";    
import { fetchUserByIdApi } from "../services/api/authApi"; 

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setError, setLoading } = useAuthStore();

  const login        = useLogin();
  const signup       = useSignup();
  const verifyOtp    = useVerifyOtp();
  // const [token]      = useState(() => localStorage.getItem("token") || "");
  const [userId]     = useState(() => localStorage.getItem("userId") || "");
  const resendOtp    = useResendOtp(userId);
  // const userProfile  = useGetUserProfile(token);
  // const updateProfile= useUpdateProfile();
  const changePassword = useChangePassword();
  const requestPasswordReset = useRequestPasswordReset();
  const resetPassword = useResetPassword();

  const handleLogin = async (
    identifier: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const res: LoginResponse = await login.mutateAsync({ identifier, password });
      if (!res.success || res.error) {
        const msg = res.error ?? "Невідома помилка під час авторизації";
        setError(msg);
        return { success: false, error: msg };
      }

      const authData = res as unknown as AuthResponse;
      localStorage.setItem("accessToken", authData.accessToken);
      localStorage.setItem("userId", authData.userId);

      const user: User = await fetchUserByIdApi(authData.userId);
      setUser({
        id: authData.userId,
        email: user.email,
        role: user.username ?? "user",
        username: user.username,
      });
      router.push("/home");
      return { success: true };
    } catch {
      const msg = "Invalid credentials. Please try again.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUser(null);
    router.push("/");
  }, [router, setUser]);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const t = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!t || !id) {
      router.push("/");
      return false;
    }
    return true;
  }, [router]);

  return {
    handleLogin,
    handleLogout,
    checkAuth,

    login,
    signup,
    verifyOtp,
    resendOtp,
    // userProfile,
    // updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
  };
};
