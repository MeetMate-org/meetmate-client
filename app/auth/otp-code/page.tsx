"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/app/ui/components/auth/auth-layout';
import { AuthForm } from '@/app/ui/components/auth/auth-form';
import { VerificationForm } from '@/app/ui/components/auth/verification-form';
import { ResetPasswordForm } from '@/app/ui/components/auth/reset-password-form';
import { AuthFormData } from '@/app/types/auth-ui';

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'verification' | 'reset'>('email');
  const [verificationCode, setVerificationCode] = useState('');

  const handleEmailSubmit = async (data: AuthFormData) => {
    // TODO: Implement sending verification code
    setEmail(data.identifier || '');
    setStep('verification');
  };

  const handleVerification = async (code: string) => {
    setVerificationCode(code);
    setStep('reset');
  };

  const handleResendCode = async () => {
    // TODO: Implement resending verification code
    console.log('Resending code to:', email);
  };

  const handlePasswordReset = async (email: string, newPassword: string) => {
    try {
      // TODO: Implement password reset API call with verification code
      console.log('Resetting password for:', email, 'with verification code:', verificationCode, 'new password:', newPassword);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <AuthLayout
      pageProps={{
        pageTitle: "Verify Your Email", 
        pageSubtitle: "We've sent a verification code to your email."
      }}
    >
      <VerificationForm
          email={email}
          onSubmit={handleVerification}
          onResend={handleResendCode}
        />
    </AuthLayout>
  );
};

export default ResetPassword; 