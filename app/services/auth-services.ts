import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginApi,
  signupApi,
  fetchUserByIdApi,
  verifyOtpApi,
  resendOtpApi,
  // getUserProfileApi,
  // updateProfileApi,
  changePasswordApi,
  requestPasswordResetApi,
  resetPasswordApi,
} from "./api/authApi";
import {
  AuthResponse,
  LoginResponse,
  // User,
  OtpVerifyResponse,
  ResetPasswordResponse,
  // UpdateProfileResponse,
} from "../types/auth";

export const useLogin = () =>
  useMutation<LoginResponse, Error, { identifier: string; password: string }>({
    mutationFn: loginApi,
    onError: e => console.error("Login error:", e),
  });

export const useSignup = () =>
  useMutation<AuthResponse, Error, { username: string; email: string; password: string }>({
    mutationFn: signupApi,
    onError: e => console.error("Signup error:", e),
  });

export const useGetUserById = (token: string, id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserByIdApi(id, token),
    enabled: Boolean(token && id)
  });

export const useVerifyOtp = () =>
  useMutation<OtpVerifyResponse, Error, { email: string; otpToken: string; emailOnly?: boolean }>({
    mutationFn: verifyOtpApi,
    onError: e => console.error("OTP verification error:", e),
  });

export const useResendOtp = (userId: string) =>
  useMutation<{ success: boolean; message: string }, Error, { email: string }>({
    mutationFn: data => resendOtpApi(userId, data),
    onError: e => console.error("OTP resend error:", e),
  });

// export const useGetUserProfile = (token: string) =>
//   useQuery<User, Error>({
//     queryKey: ["userProfile"],
//     queryFn: () => getUserProfileApi(token),
//     enabled: Boolean(token)
//   });

// export const useUpdateProfile = () =>
//   useMutation<UpdateProfileResponse, Error, { token: string; profileData: Partial<User> }>({
//     mutationFn: ({ token, profileData }) => updateProfileApi(token, profileData),
//     onError: e => console.error("Update profile error:", e),
//   });

export const useChangePassword = () =>
  useMutation<{ success: boolean; message: string }, Error, { token: string; currentPassword: string; newPassword: string }>({
    mutationFn: ({ token, currentPassword, newPassword }) =>
      changePasswordApi(token, currentPassword, newPassword),
    onError: e => console.error("Change password error:", e),
  });

export const useRequestPasswordReset = () =>
  useMutation<{ success: boolean; message: string }, Error, { email: string }>({
    mutationFn: requestPasswordResetApi,
    onError: e => console.error("Request password reset error:", e),
  });

export const useResetPassword = () =>
  useMutation<ResetPasswordResponse, Error, { newPassword: string }>({
    mutationFn: ({ newPassword }) => resetPasswordApi(newPassword),
    onError: e => console.error("Reset password error:", e),
  });
