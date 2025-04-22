"use client";

import React, { useRef } from "react";
import { IconEdit } from "../svg/icon-edit";
import { useCreateModalStore } from "@/app/store/use-modal-store";
import ModalCreate from "./edit-meeting-modal";
import { usePathname } from "next/navigation";
import { useMeetingsStore, type Meeting } from "@/app/store/use-meetings-store";

interface EditButtonWithModalProps {
  meeting: Meeting;
}

const EditButtonWithModal: React.FC<EditButtonWithModalProps> = ({
  meeting,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isModalOpen, toggleModal, setConfirmed } = useCreateModalStore();
  const { setSelectedMeetingId, resetSelectedMeetingId } = useMeetingsStore();
  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";

  const handleEditClick = () => {
    if (!meeting) {
      console.error("Meeting is undefined!");
      return;
    }
    setSelectedMeetingId(meeting.id);
    setConfirmed(false);
    toggleModal();
  };

  const handleCloseModal = () => {
    toggleModal();
    resetSelectedMeetingId();
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleEditClick}
        className="hover:opacity-75 focus:outline-none"
      >
        <IconEdit />
      </button>
      {isModalOpen && (
        <ModalCreate
          buttonRef={buttonRef as React.RefObject<HTMLButtonElement>}
        />
      )}
    </div>
  );
};

export default EditButtonWithModal;
