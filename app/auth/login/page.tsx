"use client";

import { useRouter } from "next/navigation";
import { AuthLayout } from "@/app/ui/components/auth/auth-layout";
import { AuthForm } from "@/app/ui/components/auth/auth-form";
import { useAuth } from "@/app/hooks/use-auth";
import { AuthFormData } from "@/app/types/auth-ui";

const Login = () => {
  const router = useRouter();
  const { handleLogin } = useAuth();

  const handleSubmit = async (data: AuthFormData) => {
    const result = await handleLogin(data.identifier || '', data.password);
    if (!result.success && result.error) {
      // Помилка вже обробляється в useAuth
      return;
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Реалізувати вхід через Google
    console.log("Google login");
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  const handleForgotPassword = () => {
    router.push("/auth/reset-password");
  };

  return (
    <AuthLayout
      pageProps={{
        pageTitle: "Welcome back!",
        pageSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }}
    >
      <AuthForm
        type="login"
        identifierLabel="Username or Email"
        identifierPlaceholder="Write your username or email..."
        passwordLabel="Password"
        passwordPlaceholder="Write your password..."
        rememberMeLabel="Remember me"
        submitButtonText="Sign In"
        googleButtonText="Sign In with Google"
        alternativeActionText="Don't have an account? Sign Up"
        onSubmit={handleSubmit}
        onGoogleAction={handleGoogleLogin}
        onAlternativeAction={handleSignUp}
        onForgotPassword={handleForgotPassword}
      />
    </AuthLayout>
  );
};

export default Login;
