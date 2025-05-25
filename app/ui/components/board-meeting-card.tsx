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
}

export const BoardMeetingCard: React.FC<BoardMeetingCardProps> = ({
  meeting,
}) => {
  const { setSelectedMeetingId } = useMeetingsStore();
  const { mutate: deleteMeetingMutate, isPending } = useDeleteMeeting();
  const { mutate: editMeetingMutate } = useEditMeeting();

  const [isVisible, setIsVisible] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!meeting?._id || !isVisible) {
    return null;
  }

  const handleEdit = () => {
    setSelectedMeetingId(meeting._id);
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
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
              M
            </div>
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
              {meeting.startTime && meeting.endTime
                ? `${new Date(meeting.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${new Date(meeting.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
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

        <div className="flex justify-end gap-2 mt-4">
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
        </div>

        {isEditModalOpen && (
          <EditMeetingModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            meeting={meeting}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

BoardMeetingCard.displayName = "BoardMeetingCard";
