import React from "react";
import { IconEdit } from "../svg/IconEdit";
import { IconUserMeeting } from "../svg/IconUserMeeting";
import { IconCalender } from "../svg/IconCalendar";
import { IconClock } from "../svg/IconClock";

interface MeetingCardProps {
  meetingName: string;
  nameSurname: string;
  duration: string;
  dateTime: string;
  participants: string[];
  stripeColor?: string;
  onEdit?: () => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  meetingName,
  nameSurname,
  duration,
  dateTime,
  participants,
  stripeColor = "bg-lime-500",
  onEdit,
}) => {
  return (
    <article className="relative bg-white rounded-md shadow p-4">
      <div
        className={`absolute top-0 left-0 w-full h-2 ${stripeColor} rounded-tl rounded-tr`}
      />

      <div className="flex items-center justify-between mt-2">
        <p className="text-base font-bold text-colorDarkBlue">{meetingName}</p>
        <button
          className="text-black-400 hover:text-black-600"
          onClick={onEdit}
          aria-label="Edit Meeting"
        >
          <IconEdit />
        </button>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-sm text-black-500">{nameSurname}</p>
      </div>
      <div className="flex items-center space-x-2.5 mt-2">
        <IconClock circleColor="#1C274C" />
        <p className="text-sm text-black-700">{duration}</p>
      </div>
      <div className="flex items-center space-x-2.5 mt-2">
        <IconCalender color="#1C274C" />
        <p className="text-sm text-black-700">{dateTime}</p>
      </div>
      <p className="flex text-sm text-black-700 space-x-2.5 mt-2">
        <IconUserMeeting color="#1C274C" />
        <p className="text-sm text-black-700">{participants.join(", ")}</p>
      </p>
    </article>
  );
};

MeetingCard.displayName = "MeetingCard";
