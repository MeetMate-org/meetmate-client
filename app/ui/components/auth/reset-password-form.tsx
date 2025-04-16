"use client";

import React, { useState } from 'react';

interface ResetPasswordFormProps {
  onSubmit: (email: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple email validation
    if (!email.trim()) {
      setError('Enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#21334C] text-2xl font-bold mb-4">
        Reset Password
      </h2>
      
      <p className="text-gray-600 mb-6 text-center">
        Enter your email address. We&apos;ll send you a verification code to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21334C] focus:border-transparent"
            placeholder="Enter your email address"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-[#21334C] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Code'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}; 