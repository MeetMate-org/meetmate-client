"use client";
import React from "react";
import { IconUserCircle } from "../svg/IconUserCircle";

interface UserInfoModalProps {
  userName: string;
  userEmail: string;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({
  userName,
  userEmail,
  onSettingsClick,
  onLogoutClick,
}) => {
  return (
    <div className="bg-white shadow rounded-md p-4 w-64">
      <div className="flex items-center space-x-3 mb-3">
        <IconUserCircle />
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
      </div>

      <hr className="mb-3" />

      <button
        onClick={onSettingsClick}
        className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100"
      >
        <span>Settings</span>
      </button>

      <button
        onClick={onLogoutClick}
        className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100"
      >
        <span>Log Out</span>
      </button>
    </div>
  );
};
