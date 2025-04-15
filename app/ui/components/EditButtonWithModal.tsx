"use client";

import React, { useRef } from "react";
import { IconEdit } from "../svg/icon-edit";
import { useModalStore } from "@/app/store/use-modal-store";
import ModalCreate from "./create-meeting-modal";
import { usePathname } from "next/navigation";
import { useMeetingsStore, type Meeting } from "@/app/store/use-meetings-store";

const EditButtonWithModal = () => {
  const buttonRef = useRef<HTMLButtonElement>(
    null!
  ) as React.RefObject<HTMLButtonElement>;
  const { isModalOpen, toggleModal, setConfirmed } = useModalStore();

  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";
  const isAttend = pathname === "/meetings/attend";

  const handleEditClick = () => {
    setConfirmed(false);
    toggleModal();
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

      {isModalOpen && <ModalCreate buttonRef={buttonRef} />}
    </div>
  );
};

export default EditButtonWithModal;
