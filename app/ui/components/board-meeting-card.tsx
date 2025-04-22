"use client";

import React from "react";
import { useMeetingsStore, type Meeting } from "@/app/store/use-meetings-store";
import { IconEdit } from "../svg/icon-edit";
import { IconClock } from "../svg/icon-clock";
import { IconCalender } from "../svg/icon-calendar";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDelete } from "../svg/icon-delete";
import { IconTeam } from "../svg/icon-team";
import EditButtonWithModal from "../components/EditButtonWithModal";
import { useMeetingDetailsModalStore } from "@/app/store/use-meetingDetails-store";

interface BoardMeetingCardProps {
  meeting: Meeting;
}

export const BoardMeetingCard: React.FC<BoardMeetingCardProps> = ({
  meeting,
}) => {
  const { deleteMeeting, setSelectedMeetingId } = useMeetingsStore();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const { isModalOpen, toggleModal, setMeetId } = useMeetingDetailsModalStore();

  if (!meeting?.id) {
    return null;
  }

  const handleEdit = () => {
    console.log(meeting.id);
    setMeetId(meeting.id);
    toggleModal();
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    deleteMeeting(meeting.id);
    setShowConfirmModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-colorPrimary overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {meeting.name}
            </h3>
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
              {meeting.nameSurname[0].toUpperCase()}
            </div>
            <span className="text-gray-600 text-sm">{meeting.nameSurname}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconClock color="#6B7280" />
            <span>{meeting.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconCalender color="#6B7280" />
            <span>{meeting.dateTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconUserMeeting color="#6B7280" />
            <span>{meeting.participants.length} attendees</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconTeam color="#6B7280" />
            <span>{meeting.teamName}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <div
            onClick={handleEdit}
            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <EditButtonWithModal meeting={meeting} />
          </div>
          <button
            onClick={handleDeleteClick}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <IconDelete />
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Delete Meeting
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the meeting{" "}
              <span className="font-semibold">"{meeting.name}"</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BoardMeetingCard.displayName = "BoardMeetingCard";
