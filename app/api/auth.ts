import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthResponse, LoginResponse, User, OtpVerifyResponse, ResetPasswordResponse, UpdateProfileResponse } from "../types/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined! Check your .env.local file.");
}

// Hook for login
export const useLogin = () => {
  return useMutation<LoginResponse, Error, { identifier: string; password: string }>({
    mutationFn: async (credentials) => {
      const response = await axios.post(`${apiUrl}/auth/login`, credentials);
      return response.data as LoginResponse;
    },
    onError: (error: Error) => {
      console.error("Error during login:", error);
    },
  });
};

// Hook for signup
export const useSignup = () => {
  return useMutation<AuthResponse, Error, { username: string; email: string; password: string }>({
    mutationFn: async (userData) => {
      const response = await axios.post(`${apiUrl}/auth/signup`, userData);
      return response.data as AuthResponse;
    },
    onError: (error: Error) => {
      console.error("Error during signup:", error);
    },
  });
};

// Hook for getting user by ID
export const useGetUserById = (token: string, shortId: string) => {
  return useQuery<User, Error>({
    queryKey: ["user", shortId],
    queryFn: async (): Promise<User> => {
      const response = await axios.get(`${apiUrl}/auth/getUserById`, {
        headers: { "x-access-token": token },
        params: { shortId },
      });
      console.log("Server response:", response.data);
      return response.data as User;
    },
    enabled: Boolean(token) && Boolean(shortId),
  });
};

// Hook for OTP verification
export const useVerifyOtp = () => {
  return useMutation<
    OtpVerifyResponse, 
    Error, 
    { email: string; otp: string; emailOnly?: boolean }
  >({
    mutationFn: async (verifyData) => {
      const response = await axios.post(`${apiUrl}/user/verify-otp`, verifyData);
      return response.data as OtpVerifyResponse;
    },
    onError: (error: Error) => {
      console.error("Error during OTP verification:", error);
    },
  });
};

// Hook for resending OTP
export const useResendOtp = () => {
  return useMutation<{ success: boolean; message: string }, Error, { email: string }>({
    mutationFn: async (emailData) => {
      const response = await axios.post(`${apiUrl}/user/resend-otp`, emailData);
      return response.data;
    },
    onError: (error: Error) => {
      console.error("Error during OTP resend:", error);
    },
  });
};

// Hook for getting user profile
export const useGetUserProfile = (token: string) => {
  return useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: async (): Promise<User> => {
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: { "x-access-token": token },
      });
      return response.data as User;
    },
    enabled: Boolean(token),
  });
};

// Hook for updating user profile
export const useUpdateProfile = () => {
  return useMutation<
    UpdateProfileResponse, 
    Error, 
    { token: string; profileData: Partial<User> }
  >({
    mutationFn: async ({ token, profileData }) => {
      const response = await axios.put(`${apiUrl}/user/profile`, profileData, {
        headers: { "x-access-token": token },
      });
      return response.data as UpdateProfileResponse;
    },
    onError: (error: Error) => {
      console.error("Error updating profile:", error);
    },
  });
};

// Hook for changing password
export const useChangePassword = () => {
  return useMutation<
    { success: boolean; message: string }, 
    Error, 
    { token: string; currentPassword: string; newPassword: string }
  >({
    mutationFn: async ({ token, currentPassword, newPassword }) => {
      const response = await axios.post(
        `${apiUrl}/user/change-password`, 
        { currentPassword, newPassword },
        { headers: { "x-access-token": token } }
      );
      return response.data;
    },
    onError: (error: Error) => {
      console.error("Error changing password:", error);
    },
  });
};

// Hook for requesting password reset
export const useRequestPasswordReset = () => {
  return useMutation<{ success: boolean; message: string }, Error, { email: string }>({
    mutationFn: async (emailData) => {
      const response = await axios.post(`${apiUrl}/user/request-password-reset`, emailData);
      return response.data;
    },
    onError: (error: Error) => {
      console.error("Error requesting password reset:", error);
    },
  });
};

// Hook for resetting password
export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse, 
    Error, 
    { token: string; newPassword: string }
  >({
    mutationFn: async ({ token, newPassword }) => {
      const response = await axios.post(`${apiUrl}/user/reset-password`, {
        token,
        newPassword,
      });
      return response.data as ResetPasswordResponse;
    },
    onError: (error: Error) => {
      console.error("Error resetting password:", error);
    },
  });
};