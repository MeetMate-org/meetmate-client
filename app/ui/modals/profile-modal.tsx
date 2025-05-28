"use client";

import React from "react";
import { Modal } from "./modal";
// import { ProfileForm } from "../components/profile-form";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        {/* <ProfileForm onSuccess={onClose} onCancel={onClose} /> */}
      </div>
    </Modal>
  );
}; 