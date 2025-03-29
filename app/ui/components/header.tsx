'use client';

import React, { useRef } from "react";
import { IconLogo } from "../svg/icon-logo";
import { IconBell } from "../svg/icon-bell";
import { IconUserCircle } from "../svg/icon-user-circle";
import { IconBurger } from "../svg/icon-burger";
import { useModalStore } from '@/app/store/use-modal-store';
import { useAuthStore } from '@/app/store/use-auth-store';
import { colorPurple } from "@/utils/utils";
import { UserInfoModal } from "./user-info-modal";
interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isModalOpen, toggleModal } = useModalStore();
  const { user } = useAuthStore();
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const handleUserClick = () => {
    console.log('User clicked, current modal state:', isModalOpen);
    console.log('Current user:', user);
    toggleModal();
    console.log('Modal state after toggle:', !isModalOpen);
  };

  return (
    <header>
      <section className="flex justify-between items-center p-3.5 border-b-4 border-gray-300">
        <div className="flex items-center space-x-2">
          <IconLogo color={colorPurple} />
        </div>
        <div className="flex items-center space-x-4">
          <IconBell />
          <div className="relative">
            <button 
              ref={userButtonRef}
              onClick={handleUserClick} 
              className="focus:outline-none"
            >
              <IconUserCircle />
            </button>
            {isModalOpen && (
              <UserInfoModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                buttonRef={userButtonRef}
              />
            )}
          </div>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <IconBurger />
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
