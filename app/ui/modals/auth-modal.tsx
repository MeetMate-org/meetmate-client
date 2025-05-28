"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/app/ui/components/auth/auth-layout";
import { AuthForm } from "@/app/ui/components/auth/auth-form";
import { VerificationForm } from "@/app/ui/components/auth/verification-form";
import { ResetPasswordForm } from "@/app/ui/components/auth/reset-password-form";
import { NewPasswordForm } from "@/app/ui/components/auth/new-password-form";
import {
  useLogin,
  useSignup,
  useVerifyOtp,
  useResendOtp,
  useResetPassword,
  // useGetUserById,
} from "@/app/services/auth-services";
import { Modal } from "./modal";
import { useAuthStore } from "@/app/store/use-auth-store";
import { fetchUserByIdApi } from "@/app/services/api/authApi";

interface ApiLoginResponse {
  accessToken: string;
  userId: string;
  success?: boolean;
  error?: string;
}

export const AuthModal: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "signup" | "login" | "otp" | "forgot_password" | "reset_password"
  >("login");
  const [registeredEmail, setRegisteredEmail] = useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");
    const firstVisit = localStorage.getItem("visited") !== "true";

    if (firstVisit && (!storedToken || !storedUserId)) {
      setIsOpen(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  // Закриття модалки при успішному логіні
  useEffect(() => {
    if (user) setIsOpen(false);
  }, [user]);

  const openAuthModal = () => setIsOpen(true);
  const switchToLogin = () => setModalType("login");
  const switchToSignup = () => setModalType("signup");
  const switchToOTP = () => setModalType("otp");
  const switchToForgotPassword = () => setModalType("forgot_password");
  const switchToResetPassword = () => setModalType("reset_password");

  useEffect(() => {
    window.openAuthModal = openAuthModal;
    window.switchToLogin = switchToLogin;
    window.switchToSignup = switchToSignup;
    window.switchToOTP = switchToOTP;
    return () => {
      delete window.openAuthModal;
      delete window.switchToLogin;
      delete window.switchToSignup;
      delete window.switchToOTP;
    };
  }, []);

  const handleClose = () => setIsOpen(false);

  const signUpMutation = useSignup();
  const loginMutation = useLogin();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp(registeredEmail);
  const resetPasswordMutation = useResetPassword();

  const isSignupLoading = signUpMutation.status === "pending";
  const isLoginLoading = loginMutation.status === "pending";
  const isVerifyOtpLoading = verifyOtpMutation.status === "pending";
  const isResendOtpLoading = resendOtpMutation.status === "pending";
  const isResetPasswordLoading =
    resetPasswordMutation.status === "pending";

  let content: React.ReactNode = null;

  if (modalType === "signup") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Create your account",
          pageSubtitle:
            "Join MeetMate today and start organizing your meetings efficiently.",
        }}
      >
        <AuthForm
          type="signup"
          usernameLabel="Username"
          usernamePlaceholder="Write your username..."
          emailLabel="Email"
          emailPlaceholder="Write your email..."
          passwordLabel="Password"
          passwordPlaceholder="Write your password..."
          submitButtonText={isSignupLoading ? "Signing Up..." : "Sign Up"}
          googleButtonText="Sign Up with Google"
          alternativeActionText="Already have an account? Sign In"
          onSubmit={({ username = "", email = "", password = "" }) => {
            signUpMutation.mutate(
              { username, email, password },
              {
                onSuccess: ({ accessToken, userId }) => {
                  localStorage.setItem("accessToken", accessToken);
                  localStorage.setItem("userId", userId);
                  setRegisteredEmail(email);
                  switchToOTP();
                },
                onError: console.error,
              }
            );
          }}
          onGoogleAction={() => {
            console.log("Google signup action");
          }}
          onAlternativeAction={switchToLogin}
        />
      </AuthLayout>
    );
  } else if (modalType === "login") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Welcome back!",
          pageSubtitle:
            "Sign in to access your account and manage your meetings.",
        }}
      >
        <AuthForm
          type="login"
          identifierLabel="Username or Email"
          identifierPlaceholder="Write your username or email..."
          passwordLabel="Password"
          passwordPlaceholder="Write your password..."
          rememberMeLabel="Remember me"
          submitButtonText={isLoginLoading ? "Signing In..." : "Sign In"}
          googleButtonText="Sign In with Google"
          alternativeActionText="Don't have an account? Sign Up"
          onSubmit={async ({ identifier = "", password = "" }) => {
            loginMutation.mutate(
              { identifier, password },
              {
                onSuccess: async (response) => {
                  const { accessToken, userId } = response as ApiLoginResponse;
                  localStorage.setItem("accessToken", accessToken);
                  localStorage.setItem("userId", userId);
                
                  try {
                    const userData = await fetchUserByIdApi(userId);
                    console.log("User data fetched:", userData);
                
                    localStorage.setItem("email", userData.email);
                    localStorage.setItem("username", userData.username);
                    setUser({
                      id: userId,
                      email: userData.email,
                      role: userData.username,
                      username: userData.username,
                    });
                  } catch (err) {
                    console.error("Error fetching user data:", err);
                  }
                
                  handleClose();
                  router.push("/home");
                },
                onError: console.error,
              }
            );
          }}
          onGoogleAction={() => {
            console.log("Google login action");
          }}
          onAlternativeAction={switchToSignup}
          onForgotPassword={() => {
            setRegisteredEmail("");
            switchToForgotPassword();
          }}
        />
      </AuthLayout>
    );
  } else if (modalType === "forgot_password") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Forgot your password?",
          pageSubtitle:
            "Enter your email and we'll send you a verification code.",
        }}
      >
        <ResetPasswordForm
          onSubmit={(email) => {
            setRegisteredEmail(email);
            verifyOtpMutation.mutate(
              { email, otpToken: "", emailOnly: true },
              {
                onSuccess: (res) => res.success && switchToOTP(),
                onError: console.error,
              }
            );
          }}
          onCancel={switchToLogin}
          isLoading={isVerifyOtpLoading}
        />
      </AuthLayout>
    );
  } else if (modalType === "otp") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Confirm your Email",
          pageSubtitle: "We've sent a verification code to your email.",
        }}
      >
        <VerificationForm
          email={registeredEmail}
          onSubmit={(code) => {
            verifyOtpMutation.mutate(
              { email: registeredEmail, otpToken: code },
              {
                onSuccess: (res) => {
                  if (res.accessToken) {
                    localStorage.setItem("accessToken", res.accessToken);
                    handleClose();
                    router.push("/home");
                  } else {
                    switchToResetPassword();
                  }
                },
                onError: console.error,
              }
            );
          }}
          onResend={() => {
            resendOtpMutation.mutate(
              { email: registeredEmail },
              { onError: console.error }
            );
          }}
          isLoading={isVerifyOtpLoading}
          isResendLoading={isResendOtpLoading}
        />
      </AuthLayout>
    );
  } else {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Reset Your Password",
          pageSubtitle: "Create a new secure password.",
        }}
      >
        <NewPasswordForm
          onSubmit={(newPassword) => {
            resetPasswordMutation.mutate(
              { newPassword },
              {
                onSuccess: (res) =>
                  res.success ? switchToLogin() : undefined,
                onError: console.error,
              }
            );
          }}
          onCancel={switchToLogin}
          isLoading={isResetPasswordLoading}
        />
      </AuthLayout>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {content}
    </Modal>
  );
};

declare global {
  interface Window {
    openAuthModal?: () => void;
    switchToLogin?: () => void;
    switchToSignup?: () => void;
    switchToOTP?: () => void;
  }
}
