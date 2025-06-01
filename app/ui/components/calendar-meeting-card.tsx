"use client";

import React, { useState, MouseEvent } from 'react';
import { Meeting } from '@/app/store/use-meetings-store';
import { IconEdit } from "../svg/icon-edit";
import { IconClock } from "../svg/icon-clock";
import { IconCalender } from "../svg/icon-calendar";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { useMeetingsStore } from '@/app/store/use-meetings-store';
import { format, parseISO } from 'date-fns';

export interface CalendarMeetingCardProps {
  meeting: Meeting;
}

function parseMeetingDateTime(isoString: string, duration: number) {
  try {
    const date = parseISO(isoString);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return {
      time: format(date, 'hh:mm a'),
      day: format(date, 'EEEE'),
      dayNumber: date.getDate(),
      fullDate: format(date, 'MMMM d, yyyy'),
      startTime: date,
      endTime: new Date(date.getTime() + (duration || 0) * 60000)
    };
  } catch (error) {
    console.error('Error parsing date:', error);
    return {
      time: 'Invalid time',
      day: 'Invalid day',
      dayNumber: 0,
      fullDate: 'Invalid date',
      startTime: new Date(),
      endTime: new Date()
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

  const { time, day, fullDate, dayNumber, startTime, endTime } = parseMeetingDateTime(meeting.startTime, meeting.duration);

  return (
    <div className="mb-6">
      <div
        className="flex cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        onClick={handleCardClick}
      >
        <div className="w-24 bg-colorPrimary p-3 flex flex-col justify-center items-center text-black">
          <span className="text-sm font-medium md:text-black text-white">{day}</span>
          <span className="text-2xl font-bold md:text-black text-white">{dayNumber}</span>
        </div>

        <div className="flex-1 bg-[#5E00FF80] p-4">
          <div className="flex justify-between items-start">
            <div className="text-black">
              <h3 className="font-semibold text-lg md:text-black text-white">{meeting.title}</h3>
              <p className="opacity-90 md:text-black text-white">{time}</p>
            </div>
            {isExpanded && (
              <button onClick={handleEdit} className="opacity-90 hover:opacity-100">
                <IconEdit />
              </button>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-3 text-sm text-black opacity-90">
              <div className="flex items-center gap-2">
                <IconClock color="black" />
                <span className="opacity-90">
                  {format(startTime, 'hh:mm a')} - {format(endTime, 'hh:mm a')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalender color="black" />
                <span className="opacity-90">{fullDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUserMeeting color="black" />
                <span className="opacity-90">{meeting.participants?.length || 0} attendees</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};