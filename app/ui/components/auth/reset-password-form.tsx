"use client";

import React, { useState } from 'react';
import { IconEye } from '../../svg/icon-eye';

interface ResetPasswordFormProps {
  email: string;
  onSubmit: (email: string, password: string) => void;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email: initialEmail,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
        isValid = false;
      }
      if (/\s/.test(password)) {
        newErrors.password = 'Password must not contain spaces';
        isValid = false;
      }
      if (!/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password)) {
        newErrors.password = 'Password must contain only English letters, numbers and special characters';
        isValid = false;
      }
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#21334C] text-2xl font-bold mb-4">
        Reset Password
      </h2>
      
      <p className="text-gray-600 mb-8 text-center">
        Please enter your email and create a new password
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none"
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none"
              placeholder="Enter new password..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <IconEye isOpen={showPassword} />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none"
              placeholder="Re-enter new password..."
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <IconEye isOpen={showConfirmPassword} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#21334C] text-white py-4 rounded-xl text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}; 