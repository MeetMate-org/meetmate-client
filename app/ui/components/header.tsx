'use client';

import React, { useEffect, useRef, useState } from "react";
import { IconLogo } from "../svg/icon-logo";
import { IconBell } from "../svg/icon-bell";
import { IconUserCircle } from "../svg/icon-user-circle";
import { IconBurger } from "../svg/icon-burger";
import { useModalStore } from '@/app/store/use-modal-store';
import { useAuthStore } from '@/app/store/use-auth-store';
import { colorPrimary } from "@/utils/utils";
import { UserInfoModal } from "../modals/user-info-modal";
import { AuthOptionsModal } from "../modals/auth-options-modal";
import { useSidebarStore } from "@/app/store/use-sidebar-store";
import { subscribe } from "@/app/services/subscribe";
import { Toaster } from "react-hot-toast";
import { INotification } from "@/app/types/isubscribe";
import { useGetUserById } from "@/app/services/auth-services";
import NotificationsModal from "./modals/notifications-modal";

const Header = () => {
  const { isModalOpen, toggleModal } = useModalStore();
  const { user } = useAuthStore();
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isAuthOptionsOpen, setIsAuthOptionsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toggleSidebar } = useSidebarStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleUserClick = () => {
    if (!user) {
      setIsAuthOptionsOpen(true);
    } else {
      toggleModal();
    }
  };

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const closeAuthOptions = () => {
    setIsAuthOptionsOpen(false);
  };

  const key: string = process.env.NEXT_PUBLIC_KEY || "";
  const cluster: string = process.env.NEXT_PUBLIC_CLUSTER || "";
  const { data: userData } = useGetUserById(userId ?? "");

  useEffect(() => {
    // Access localStorage only in the browser
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    setNotifications(userData?.notifications || []);
  }, [userData]);
  

  useEffect(() => {
    if (userId && userData) {
      subscribe({ key, cluster, setNotifications, username: user?.username || "", email: userData?.email || "" });
    }
  }, [cluster, key, user, userId, userData]);

  return (
    <>
      <header>
        <section className="flex justify-between items-center p-3.5 border-b-2 border-gray-300">
          <div onClick={handleToggleSidebar} className="flex items-center space-x-2 cursor-pointer">
            <IconLogo color={colorPrimary} />
          </div>
          <div className="flex items-center space-x-4">
              <>
                {notifications.length > 0 && (
                  <button onClick={() => setIsNotificationsOpen(true)} className="focus:outline-none">
                    <IconBell />
                  </button>
                )}
                {isNotificationsOpen && <NotificationsModal notifications={notifications} setIsNotificationsOpen={setIsNotificationsOpen} />}
              </>
            <div className="relative">
              <button 
                ref={userButtonRef}
                onClick={handleUserClick} 
                className="focus:outline-none"
              >
                <IconUserCircle />
              </button>
              {isModalOpen && user && (
                <UserInfoModal
                  isOpen={isModalOpen}
                  buttonRef={userButtonRef}
                />
              )}
              {isAuthOptionsOpen && !user && (
                <AuthOptionsModal
                  isOpen={isAuthOptionsOpen}
                  buttonRef={userButtonRef}
                  onClose={closeAuthOptions}
                />
              )}
            </div>
            <button onClick={toggleSidebar} className="md:hidden focus:outline-none">
              <IconBurger />
            </button>
          </div>
        </section>
      </header>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default Header;
