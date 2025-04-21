"use client";

import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface VerificationFormProps {
  email: string;
  onSubmit: (code: string) => void;
  onResend: () => void;
  isLoading?: boolean;
  isResendLoading?: boolean;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  onSubmit,
  onResend,
  isLoading = false,
  isResendLoading = false
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(fullCode);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#21334C] text-2xl font-bold mb-4">
        Confirm your Email
      </h2>
      
      <p className="text-gray-600 mb-8 text-center">
        We have sent you a verification code on this email
        <br />
        <span className="font-medium">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-[#21334C] focus:ring-1 focus:ring-[#21334C] outline-none"
              required
              disabled={isLoading}
            />
          ))}
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">Didn&apos;t receive the code?</span>{' '}
          <button
            type="button"
            onClick={onResend}
            className="text-purple-600 font-semibold hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isResendLoading}
          >
            {isResendLoading ? 'Sending...' : 'Try again'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#21334C] text-white py-4 rounded-xl text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}; 