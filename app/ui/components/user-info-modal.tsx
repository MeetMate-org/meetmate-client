"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconUserCircle } from "../svg/icon-user-circle";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useModalStore } from "@/app/store/use-modal-store";
import { useAuth } from "@/app/hooks/use-auth";
import { ProfileModal } from "../modals/profile-modal";

interface UserInfoModalProps {
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, buttonRef }) => {
  const { user } = useAuthStore();
  const { handleLogout } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const { toggleModal } = useModalStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleModal, buttonRef]);

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

  const handleUserLogout = () => {
    handleLogout();
    toggleModal();
  };

  const handleEditProfile = () => {
    setIsProfileModalOpen(true);
    toggleModal();
  };

  return (
    <>
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
            <button
              onClick={handleEditProfile}
              disabled={true}
              className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
            
            <button
              onClick={handleUserLogout}
              className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
            
            <button
              onClick={toggleModal}
              className="w-full px-3 py-2 text-sm bg-colorPrimary text-white rounded hover:opacity-[.7] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};

UserInfoModal.displayName = "UserInfoModal";
