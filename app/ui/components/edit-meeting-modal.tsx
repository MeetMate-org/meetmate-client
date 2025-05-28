"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCreateModalStore } from "@/app/store/use-modal-store";
import { Meeting, useMeetingsStore } from "@/app/store/use-meetings-store";

import { IconEdit } from "../svg/icon-edit";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDelete } from "../svg/icon-delete";
import { usePathname } from "next/navigation";
import { IconLink } from "../svg/icon-link";
import { IconCheckCircle } from "../svg/icon-confirm";

interface ModalCreateProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ buttonRef }) => {
  const { isModalOpen, isConfirmed, toggleModal } = useCreateModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";
  const isAttend = pathname === "/meetings/attend";

  const { meetings, selectedMeetingId, updateMeeting } = useMeetingsStore();
  const [localMeeting, setLocalMeeting] = useState<Meeting | null>(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editedTime, setEditedTime] = useState("");

  useEffect(() => {
    if (isModalOpen && selectedMeetingId) {
      const found = meetings.find((m) => m.id === selectedMeetingId);
      if (found) {
        setLocalMeeting(found);
        setEditedName(found.name);
      }
    }
  }, [isModalOpen, selectedMeetingId, meetings]);

  useEffect(() => {
    if (!isModalOpen) setLocalMeeting(null);
  }, [isModalOpen]);

  const handleSaveAll = () => {
    if (!localMeeting) return;
    const updatedMeeting = {
      ...localMeeting,
      name: editedName,
    };
    updateMeeting(updatedMeeting);
    setIsEditingName(false);
    toggleModal();
  };

  const handleDeleteEmail = (index: number) => {
    if (!localMeeting) return;
    const updated = [...localMeeting.participants];
    updated.splice(index, 1);
    setLocalMeeting({ ...localMeeting, participants: updated });
  };

  const handleAddEmail = () => {
    if (!newEmail || !localMeeting) return;
    setLocalMeeting({
      ...localMeeting,
      participants: [...localMeeting.participants, newEmail],
    });
    setNewEmail("");
  };

  if (!isModalOpen || !localMeeting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div
        ref={modalRef}
        className="bg-white text-black rounded-2xl shadow-xl p-6 w-[420px] max-h-[90vh] overflow-y-auto relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl pl-12 font-semibold text-center flex items-center gap-2">
            {isEditingName ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              localMeeting.name
            )}
            {isHost && !isEditingName && (
              <button onClick={() => setIsEditingName(true)}>
                <IconEdit />
              </button>
            )}
          </h2>
          <button
            onClick={toggleModal}
            className="text-gray-600 hover:text-black"
          >
            Close
          </button>
        </div>

        <p className="text-sm text-center mb-4">
          {isHost
            ? "Here you can edit your Meeting"
            : "Here you can see all meeting’s options"}
        </p>

        <div className="border rounded-md p-2 mb-4 text-center">
          {localMeeting.dateTime}
        </div>

        {isHost || (isConfirmed && isAttend) ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {localMeeting.timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  {slot}
                </div>
              ))}
            </div>
            {isConfirmed && isAttend && (
              <p className="text-xs text-center text-black">
                You can’t revote because the host <br />
                has already confirmed the localMeeting time
              </p>
            )}
          </>
        ) : (
          <div className="bg-violet-600 w-[135px] h-[50px] text-white justify-center rounded-md flex items-center">
            {localMeeting.timeSlots[0]}
          </div>
        )}

        {isHost && (
          <>
            <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2 mb-2">
              <IconUserMeeting />
              <span>{localMeeting.participants.length} attendees</span>
              <span className="bg-blue-200 ml-4 text-blue-800 px-2 py-1 rounded-full text-xs">
                {localMeeting.teamName.slice(0, 2).toUpperCase()}
              </span>
              <span className="ml-1">{localMeeting.teamName}</span>
            </div>

            <div className="flex mb-2">
              <input
                type="email"
                placeholder="Write new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border rounded-l-md p-2 w-full"
              />
              <button
                onClick={handleAddEmail}
                className="bg-green-500 text-white px-3 rounded-r-md"
              >
                +
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-2">
              {localMeeting.participants.map((email, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-100 rounded-md p-2"
                >
                  <span>{email}</span>
                  <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => handleDeleteEmail(i)}
                  >
                    <IconDelete />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button className="bg-gray-100 p-2 rounded-lg rotate-90">
            <IconLink />
          </button>

          <button
            onClick={handleSaveAll}
            className="bg-green-100 text-green-600 p-2 rounded-lg"
          >
            <IconCheckCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
