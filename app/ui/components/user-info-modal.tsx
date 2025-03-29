"use client";
import React, { useEffect, useRef } from "react";
import { IconUserCircle } from "../svg/icon-user-circle";
import { useAuthStore } from "@/app/store/use-auth-store";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, buttonRef }) => {
  const { user } = useAuthStore();
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

  if (!isOpen || !user) {
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
        <div className="flex items-center gap-3 mb-4">
          <IconUserCircle />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-medium text-gray-500">Role</h3>
            <p className="text-sm text-gray-900">{user.role}</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

UserInfoModal.displayName = "UserInfoModal";
