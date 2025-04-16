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
  useResetPassword 
} from "@/app/api/auth";
import { Modal } from "./modal";
import { useAuthStore } from "@/app/store/use-auth-store";

// Interface for login API response
interface ApiLoginResponse {
  token: string;
  userId: string;
  success?: boolean;
  error?: string;
}

export const AuthModal = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  // States for controlling modal display and form type
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"signup" | "login" | "otp" | "forgot_password" | "reset_password">("login");
  const [registeredEmail, setRegisteredEmail] = useState<string>("");
  
  // On first load, check if authentication exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const isFirstVisit = localStorage.getItem("visited") !== "true";
    
    // If this is the first visit and the user is not authenticated, open the modal window
    if (isFirstVisit && (!token || !userId)) {
      setIsOpen(true);
      localStorage.setItem("visited", "true");
    }
  }, []);
  
  // Effect for responding to authentication state changes
  useEffect(() => {
    // If user is authenticated, close the modal window
    if (user) {
      setIsOpen(false);
    }
  }, [user]);
  
  // Public method for opening the modal window from outside
  const openAuthModal = () => {
    setIsOpen(true);
  };
  
  // Functions for switching between forms
  const switchToLogin = () => setModalType("login");
  const switchToSignup = () => setModalType("signup");
  const switchToOTP = () => setModalType("otp");
  const switchToForgotPassword = () => setModalType("forgot_password");
  const switchToResetPassword = () => setModalType("reset_password");
  
  // Add methods to the global window object so they can be called from outside
  useEffect(() => {
    window.openAuthModal = openAuthModal;
    window.switchToLogin = switchToLogin;
    window.switchToSignup = switchToSignup;
    window.switchToOTP = switchToOTP;
    
    return () => {
      // Cleanup when component is unmounted
      delete window.openAuthModal;
      delete window.switchToLogin;
      delete window.switchToSignup;
      delete window.switchToOTP;
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Use TanStack Query hooks
  const signUpMutation = useSignup();
  const loginMutation = useLogin();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp(localStorage.getItem("userId") || "");
  const resetPasswordMutation = useResetPassword();

  const isSignupLoading = signUpMutation.status === "pending";
  const isLoginLoading = loginMutation.status === "pending";
  const isVerifyOtpLoading = verifyOtpMutation.status === "pending";
  const isResendOtpLoading = resendOtpMutation.status === "pending";
  const isResetPasswordLoading = resetPasswordMutation.status === "pending";

  let content = null;

  if (modalType === "signup") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Create your account",
          pageSubtitle: "Join MeetMate today and start organizing your meetings efficiently.",
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
          onSubmit={(data) => {
            const username = data.username ?? "";
            const email = data.email ?? "";
            const password = data.password ?? "";
            signUpMutation.mutate(
              { username, email, password },
              {
                onSuccess: (response) => {
                  console.log("Signup successful:", response);
                  localStorage.setItem("token", response.token);
                  localStorage.setItem("userId", response.userId);
                  localStorage.setItem("email", email);
                  localStorage.setItem("name", username);
                  setRegisteredEmail(email);
                  switchToOTP();
                },
                onError: (error) => {
                  console.error("Signup error:", error);
                },
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
          pageSubtitle: "Sign in to access your account and manage your meetings.",
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
          onSubmit={(data) => {
            const identifier = data.identifier ?? "";
            const password = data.password ?? "";
            loginMutation.mutate(
              { identifier, password },
              {
                onSuccess: (response) => {
                  console.log("Login successful:", response);
                  const apiResponse = response as unknown as ApiLoginResponse & {
                    email?: string;
                    name?: string;
                  };;
                  
                  if (apiResponse && apiResponse.token && apiResponse.userId) {
                    localStorage.setItem("token", apiResponse.token);
                    localStorage.setItem("userId", apiResponse.userId);

                    if (apiResponse.email) localStorage.setItem("email", apiResponse.email);
                    if (apiResponse.name) localStorage.setItem("name", apiResponse.name);

                    handleClose();
                    router.push("/home/board");
                  } else {
                    console.error("Invalid response format:", response);
                  }
                },
                onError: (error) => {
                  console.error("Login error:", error);
                },
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
          pageSubtitle: "Enter your email and we'll send you a verification code to reset your password.",
        }}
      >
        <ResetPasswordForm
          onSubmit={(email) => {
            setRegisteredEmail(email);
            verifyOtpMutation.mutate(
              { email, otpToken: "", emailOnly: true },
              {
                onSuccess: (response) => {
                  console.log("Password reset OTP sent:", response);
                  if (response.success) {
                    switchToOTP();
                  }
                },
                onError: (error) => {
                  console.error("Password reset OTP error:", error);
                }
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
          pageSubtitle: "We've sent you a verification code to your email.",
        }}
      >
        <VerificationForm
          email={registeredEmail || "user@example.com"}
          onSubmit={(code) => {
            console.log("OTP code entered:", code);
            verifyOtpMutation.mutate(
              { email: registeredEmail, otpToken: code },
              {
                onSuccess: (response) => {
                  console.log("OTP verification successful:", response);
                    if (response.token) {
                      handleClose();
                      localStorage.setItem("token", response.token);
                      router.push("/home/board");
                    } else {
                      switchToResetPassword();
                    }
                },
                onError: (error) => {
                  console.error("OTP verification error:", error);
                },
              }
            );
          }}
          onResend={() => {
            console.log("Resending OTP code");
            if (registeredEmail) {
              resendOtpMutation.mutate(
                { email: registeredEmail },
                {
                  onSuccess: (response) => {
                    console.log("OTP resend successful:", response);
                  },
                  onError: (error) => {
                    console.error("OTP resend error:", error);
                  },
                }
              );
            }
          }}
          isLoading={isVerifyOtpLoading}
          isResendLoading={isResendOtpLoading}
        />
      </AuthLayout>
    );
  } else if (modalType === "reset_password") {
    content = (
      <AuthLayout
        pageProps={{
          pageTitle: "Reset Your Password",
          pageSubtitle: "Create a new secure password for your account.",
        }}
      >
        <NewPasswordForm
          onSubmit={(newPassword) => {
            resetPasswordMutation.mutate(
              { newPassword },
              {
                onSuccess: (response) => {
                  console.log("Password reset successful:", response);
                  if (response.success) {
                    // Return to login form
                    switchToLogin();
                  }
                },
                onError: (error) => {
                  console.error("Password reset error:", error);
                }
              }
            );
          }}
          onCancel={switchToLogin}
          isLoading={isResetPasswordLoading}
        />
      </AuthLayout>
    );
  }

  return <Modal isOpen={isOpen} onClose={handleClose}>{content}</Modal>;
};

declare global {
  interface Window {
    openAuthModal?: () => void;
    switchToLogin?: () => void;
    switchToSignup?: () => void;
    switchToOTP?: () => void;
  }
}
