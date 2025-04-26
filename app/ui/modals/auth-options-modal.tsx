"use client";
import React, { useEffect, useRef } from "react";

interface AuthOptionsModalProps {
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export const AuthOptionsModal: React.FC<AuthOptionsModalProps> = ({ 
  isOpen, 
  buttonRef,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, buttonRef]);

  if (!isOpen) {
    return null;
  }

  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: `${rect.bottom + 8}px`,
        right: `${window.innerWidth - rect.right}px`
      };
    }
    return {};
  };

  const position = calculatePosition();

  const handleSignIn = () => {
    if (window.openAuthModal) {
      window.openAuthModal();
      onClose();
    }
  };

  const handleSignUp = () => {
    if (window.openAuthModal) {
      window.openAuthModal();
      setTimeout(() => {
        if (typeof window.switchToSignup === 'function') {
          window.switchToSignup();
        }
      }, 100);
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed bg-white rounded-lg shadow-lg z-50"
      style={{
        ...position,
        width: '280px'
      }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Account</h2>
        
        <div className="space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          
          <button
            onClick={handleSignUp}
            className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Create Account
          </button>
          
          <hr className="my-2" />
          
          <button
            onClick={onClose}
            className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

AuthOptionsModal.displayName = "AuthOptionsModal"; 