"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { AuthFormProps, AuthFormData } from '@/app/types/auth-ui';
import { IconEye } from '../../svg/icon-eye';

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  usernameLabel,
  usernamePlaceholder,
  emailLabel,
  emailPlaceholder,
  identifierLabel,
  identifierPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  rememberMeLabel,
  submitButtonText,
  googleButtonText,
  alternativeActionText,
  onSubmit,
  onGoogleAction,
  onAlternativeAction,
  onForgotPassword
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    identifier: '',
    username: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#21334C] text-2xl font-bold mb-8">
        {type === 'login' ? 'Welcome back!' : 'Create account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'login' ? (
          <div>
            <label className="block text-[#21334C] text-lg mb-2">
              {identifierLabel || 'Username or Email'}
            </label>
            <input
              type="text"
              name="identifier"
              placeholder={identifierPlaceholder || 'Write your username or email...'}
              value={formData.identifier}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none text-gray-700"
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-[#21334C] text-lg mb-2">
                {usernameLabel || 'Username'}
              </label>
              <input
                type="text"
                name="username"
                placeholder={usernamePlaceholder || 'Write your username...'}
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-[#21334C] text-lg mb-2">
                {emailLabel || 'Email'}
              </label>
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder || 'Write your email...'}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none text-gray-700"
                required
              />
            </div>
          </>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[#21334C] text-lg">
              {passwordLabel || 'Password'}
            </label>
            {type === 'login' && onForgotPassword && (
              <button
                type="button"
                onClick={onForgotPassword}
                className="hover:text-gray-700 text-sm font-semibold"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={passwordPlaceholder || 'Write your password...'}
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none text-gray-700"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IconEye isOpen={showPassword} />
            </button>
          </div>
        </div>

        {type === 'login' && rememberMeLabel && (
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-5 h-5 rounded border-gray-300 text-[#21334C] focus:ring-[#21334C]"
            />
            <label htmlFor="rememberMe" className="ml-2 text-[#21334C] select-none cursor-pointer">
              {rememberMeLabel}
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#21334C] text-white py-4 rounded-xl text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          {submitButtonText}
        </button>

        {googleButtonText && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onGoogleAction}
              className="w-full flex justify-center items-center gap-2 bg-gray-50 py-4 rounded-xl text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors border border-gray-300"
            >
              <Image
                src="/images/google.png"
                alt="Google"
                width={20}
                height={20}
              />
              {googleButtonText}
            </button>
          </>
        )}

        {alternativeActionText && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onAlternativeAction}
              className="text-[#21334C] hover:underline"
            >
              {alternativeActionText}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}; 