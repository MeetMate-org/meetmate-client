"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "@/app/ui/components/auth/auth-form";
import { AuthFormData } from "@/app/types/auth-ui";
import { singup } from "@/app/api/auth";
import { AuthLayout } from "@/app/ui/components/auth/auth-layout";

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await singup(data.username || '', data.email || '', data.password);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Реалізувати реєстрацію через Google
    console.log("Google signup");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <AuthLayout
      pageProps={{
        pageTitle: "Create your account",
        pageSubtitle: "Join MeetMate today and start organizing your meetings efficiently."
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
        submitButtonText="Sign Up"
        googleButtonText="Sign Up with Google"
        alternativeActionText="Already have an account? Sign In"
        onSubmit={handleSubmit}
        onGoogleAction={handleGoogleSignup}
        onAlternativeAction={handleLogin}
      />
    </AuthLayout>
  );
};

export default SignUp;