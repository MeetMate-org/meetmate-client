"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useModalStore } from "@/app/store/use-modal-store";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { IconEdit } from "../svg/icon-edit";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDelete } from "../svg/icon-delete";
import { usePathname } from "next/navigation";
import { IconLink } from "../svg/icon-link";
import { IconLogout } from "../svg/icon-logout";
import { IconAltArrowRight } from "../svg/icon-arrow-all";
import { IconCheckCircle } from "../svg/icon-confirm";

interface ModalCreateProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ buttonRef }) => {
  const { isModalOpen, isConfirmed, toggleModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";
  const isAttend = pathname === "/meetings/attend";

  const { meetings, selectedMeetingId } = useMeetingsStore();

  const meeting = useMemo(() => {
    console.log(1);
    return meetings.find((m) => m.id === selectedMeetingId);
  }, [meetings, selectedMeetingId]);

  if (!isModalOpen || !meeting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div
        ref={modalRef}
        className="bg-white text-black rounded-2xl shadow-xl p-6 w-[420px] max-h-[90vh] overflow-y-auto relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl pl-12 font-semibold text-center flex items-center gap-2">
            {meeting.name}
            {isHost && <IconEdit />}
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
            ? "Here you can edit your meeting"
            : "Here you can see all meeting’s options"}
        </p>

        <div className="border rounded-md p-2 mb-4 text-center">
          {meeting.dateTime}
        </div>

        {isHost ? (
          <div className="flex items-center w-[135px] h-[50px] justify-center mb-2">
            <div className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              14:00-16:30
            </div>
          </div>
        ) : isConfirmed && isAttend ? (
          <>
            <div className="flex items-center w-[135px] h-[50px] flex-col mb-2">
              <div className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                14:00-16:30
              </div>
            </div>
            <p className="text-xs text-right text-center text-black">
              You can’t revote because the host <br />
              has already confirmed the meeting time
            </p>
          </>
        ) : (
          <div className="bg-violet-600  w-[135px] h-[50px] text-white justify-center rounded-md flex items-center">
            14:00-16:30
          </div>
        )}

        {isHost && (
          <div className="mt-4">
            <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2 mb-2">
              <IconUserMeeting />
              <span>{meeting.participants.length} attendees</span>
              <span className="bg-blue-200 ml-4 text-blue-800 px-2 py-1 rounded-full text-xs">
                {meeting.teamName.slice(0, 2).toUpperCase()}
              </span>
              <span className="ml-1">{meeting.teamName}</span>
            </div>

            <div className="flex mb-2">
              <input
                type="email"
                placeholder="Write new email"
                className="border rounded-l-md p-2 w-full"
              />
              <button className="bg-green-500 text-white px-3 rounded-r-md">
                +
              </button>
            </div>

            {meeting.participants.map((email, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-100 rounded-md p-2 mb-2"
              >
                <span>{email}</span>
                <button className="text-red-500 hover:text-red-700">
                  <IconDelete />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button className="bg-gray-100 p-2 rounded-lg rotate-90">
            <IconLink />
          </button>
          {isConfirmed && isAttend ? (
            <div className="justify-between flex items-center">
              <p className="text-gray-500 text-sm pr-2 ">Leave the meeting</p>
              <button className="bg-gray-100 p-2 rounded-lg">
                <IconLogout />
              </button>
            </div>
          ) : isHost ? (
            <div className="justify-between flex items-center">
              <button className="bg-gray-100 p-2 rounded-lg">
                <IconCheckCircle />
              </button>
            </div>
          ) : (
            <div className="justify-between flex items-center">
              <button className="bg-gray-100 p-2 rounded-lg">
                <IconLogout />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
