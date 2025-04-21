"use client";

import React, { useState, MouseEvent } from 'react';
import { Meeting } from '@/app/store/use-meetings-store';
import { IconEdit } from "../svg/icon-edit";
import { IconClock } from "../svg/icon-clock";
import { IconCalender } from "../svg/icon-calendar";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { useMeetingsStore } from '@/app/store/use-meetings-store';

export interface CalendarMeetingCardProps {
  meeting: Meeting;
}

function parseMeetingDateTime(dateTimeString: string | undefined) {
  if (!dateTimeString) {
    console.error('Invalid dateTimeString:', dateTimeString);
    return {
      time: 'Unknown',
      day: 'Unknown',
      dayNumber: 0,
      fullDate: 'Unknown'
    };
  }

  try {
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', dateTimeString);
      return {
        time: dateTimeString,
        day: 'Unknown',
        dayNumber: 0,
        fullDate: dateTimeString
      };
    }

    const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const weekDay = date.toLocaleDateString([], { weekday: 'long' });
    const dayNumber = date.getDate();
    const fullDate = date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

    return {
      time: timePart,
      day: weekDay,
      dayNumber,
      fullDate
    };
  } catch (error) {
    console.error('Error parsing date:', error);
    return {
      time: 'Unknown',
      day: 'Unknown',
      dayNumber: 0,
      fullDate: 'Unknown'
    };
  }
}

export const CalendarMeetingCard: React.FC<CalendarMeetingCardProps> = ({ meeting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const setEditingMeeting = useMeetingsStore((state) => state.setEditingMeeting);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditingMeeting(meeting.id);
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const { time, day, fullDate, dayNumber } = parseMeetingDateTime(new Date(meeting.startTime).toLocaleString());

  return (
    <div 
      className="flex cursor-pointer rounded-2xl overflow-hidden shadow-sm mb-4 hover:shadow-md transition-shadow" 
      onClick={handleCardClick}
    >
      <div className="w-24 bg-colorPrimary p-3 flex flex-col justify-center items-center text-black">
        <span className="text-sm font-medium md:text-black text-white">{day}</span>
        <span className="text-2xl font-bold md:text-black text-white">{dayNumber}</span>
      </div>
      
      <div className="flex-1 bg-[#5E00FF80] p-4 ">
        <div className="flex justify-between items-start">
          <div className="text-black">
            <h3 className="font-semibold text-lg md:text-black text-white">{meeting.title}</h3>
            <p className="opacity-90 md:text-black text-white">{time}</p>
          </div>
          {isExpanded && (
            <button 
              onClick={handleEdit}
              className=" opacity-90 hover:opacity-100"
            >
              <IconEdit />
            </button>
          )}
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 text-sm text-black opacity-90">
            <div className="flex items-center gap-2">
              <IconClock color="black" />
              <span className="opacity-90">{
                meeting.startTime && meeting.endTime
                  ? `${new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : "No time set"
                }</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCalender color="black" />
              <span className="opacity-90">{fullDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconUserMeeting color="black" />
              <span className="opacity-90">{meeting.participants.length} attendees</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
