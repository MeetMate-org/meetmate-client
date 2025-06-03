"use client";

import React, { useState } from "react";
import { useMeetingsStore, type Meeting } from "@/app/store/use-meetings-store";
import { IconEdit } from "../svg/icon-edit";
import { IconClock } from "../svg/icon-clock";
import { IconCalender } from "../svg/icon-calendar";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDelete } from "../svg/icon-delete";

import {
  useDeleteMeeting,
  useEditMeeting,
} from "@/app/hooks/use-update-meetings";
import { toast } from "react-hot-toast";
import { EditMeetingModal } from "./modals/edit-meetings-modal";
import { LinkChainIcon } from "../svg/icon-link";

interface BoardMeetingCardProps {
  meeting: Meeting;
  isAttender?: boolean
}

export const BoardMeetingCard: React.FC<BoardMeetingCardProps> = ({
  meeting,
  isAttender
}) => {
  const { setSelectedMeetingId } = useMeetingsStore();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const { mutate: deleteMeetingMutate, isPending } = useDeleteMeeting();
  const { mutate: editMeetingMutate } = useEditMeeting();

  const [isVisible, setIsVisible] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!meeting?._id || !isVisible) {
    return null;
  }

  const handleEdit = () => {
    setSelectedMeetingId(meeting.id);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedMeeting: Partial<Meeting>) => {
    if (!updatedMeeting._id || !updatedMeeting.startTime) {
      return;
    }

    editMeetingMutate(
      {
        meetingId: updatedMeeting._id,
        updatedData: updatedMeeting,
      },
      {
        onSuccess: () => {
          toast.success("Meeting updated successfully");
        },
        onError: () => toast.error("Failed to update meeting"),
      }
    );
  };

  const handleDelete = () => {
    setIsVisible(false);

    deleteMeetingMutate(meeting._id, {
      onSuccess: () => toast.success("Meeting deleted"),
      onError: () => {
        toast.error("Failed to delete meeting");
        setIsVisible(true);
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-colorPrimary overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {meeting.title}
            </h3>
            <span className="text-gray-600 text-sm">              
              {meeting.organizerName}
            </span>
          </div>
          <a
            href={meeting.link}
            target="_blank"
            rel="noopener noreferrer"
            title="Open meeting link"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <LinkChainIcon className="w-5 h-5" color="#6B7280" />
          </a>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconClock color="#6B7280" />
            <span>
              {meeting.startTime 
                ? `${new Date(meeting.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${
                    // meeting starttime + duration
                    new Date(
                      new Date(meeting.startTime).getTime() +
                      meeting.duration * 60000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }`
                : "No time set"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconCalender color="#6B7280" />
            <span>{new Date(meeting.startTime).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconUserMeeting color="#6B7280" />
            <span>{meeting.participants.length} attendees</span>
          </div>
        </div>

        {!isAttender && <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleEdit}
            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <IconEdit />
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <IconDelete />
          </button>
        </div>}

        {isEditModalOpen && (
          <EditMeetingModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            meeting={meeting}
            onSave={handleSave}
          />
        )}
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
              <span className="font-semibold">"{meeting.title}"</span>?
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
