"use client";
import React, { useEffect, useState } from "react";
import { IconArrow } from "../svg/icon-arrow";
import { Meeting } from "@/app/store/use-meetings-store";

export const HOURS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

interface CalendarEvent {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

export default function WeekCalendar({
  meetings,
}: {
  meetings: Meeting[];
}) {
  const [isClient, setIsClient] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<{ start: Date; end: Date }>();
  const [days, setDays] = useState<{ label: string; date: string }[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Initialize with current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    setCurrentWeek({ start: startOfWeek, end: endOfWeek });
  }, []);

  useEffect(() => {
    if (currentWeek) {
      const days = [];
      const start = new Date(currentWeek.start);
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        days.push({
          label: date.toLocaleDateString("en-US", { weekday: "short" }),
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        });
      }
      setDays(days);
    }
  }, [currentWeek]);

  if (!meetings) {
    return null;
  }

  const handlePrev = () => {
    if (!currentWeek) return;
    const newStart = new Date(currentWeek.start);
    newStart.setDate(newStart.getDate() - 7);
    const newEnd = new Date(newStart);
    newEnd.setDate(newStart.getDate() + 6);
    setCurrentWeek({ start: newStart, end: newEnd });
  };

  const handleNext = () => {
    if (!currentWeek) return;
    const newStart = new Date(currentWeek.start);
    newStart.setDate(newStart.getDate() + 7);
    const newEnd = new Date(newStart);
    newEnd.setDate(newStart.getDate() + 6);
    setCurrentWeek({ start: newStart, end: newEnd });
  };

  const formatDateRange = () => {
    if (!currentWeek) return "Loading...";
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return `${currentWeek.start.toLocaleDateString(
      "en-US",
      options
    )} – ${currentWeek.end.toLocaleDateString(
      "en-US",
      options
    )}, ${currentWeek.end.getFullYear()}`;
  };

  const parseMeetingDate = (dateStr: string) => {
    if (!dateStr) {
      console.error("Invalid date string:", dateStr);
      return { day: "Unknown", startTime: "Unknown", endTime: "Unknown" };
    }

    try {
      const date = new Date(dateStr);

      if (isNaN(date.getTime())) {
        console.error("Invalid date format:", dateStr);
        return { day: "Unknown", startTime: "Unknown", endTime: "Unknown" };
      }

      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      });
      const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });

      return { day, startTime };
    } catch (error) {
      console.error("Error parsing meeting date:", error);
      return { day: "Unknown", startTime: "Unknown", endTime: "Unknown" };
    }
  };

  const calendarEvents: CalendarEvent[] = meetings
    .filter((meeting) => {
      if (!currentWeek) return false;

      const meetingDate = new Date(meeting.startTime);
      return (
        meetingDate >= currentWeek.start &&
        meetingDate <= currentWeek.end
      );
    })
    .map((meeting) => {
      const { day, startTime } = parseMeetingDate(meeting.startTime);
      const endTime = meeting.endTime
        ? new Date(meeting.endTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "Unknown";

      return {
        id: meeting._id,
        title: meeting.title,
        day,
        startTime,
        endTime,
        color: meeting.color || "#000000", // Default color if undefined
      };
    });

  if (!isClient) {
    return (
      <div className="p-4 bg-white rounded-md shadow border border-purple-100 h-96">
        Loading calendar...
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md shadow border border-purple-100">
      <div className="flex items-center justify-center space-x-6 mb-4">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-50"
          aria-label="Previous week"
        >
          <IconArrow direction="left" />
        </button>

        <h2 className="font-semibold text-lg text-purple-900">
          {formatDateRange()}
        </h2>

        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-50"
          aria-label="Next week"
        >
          <IconArrow direction="right" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-purple-50">
              <th className="p-2 border border-purple-100 w-16"></th>
              {days.map((day) => (
                <th
                  key={day.label}
                  className="p-2 border border-purple-100 text-center w-36"
                >
                  <div className="font-bold text-purple-900">{day.label}</div>
                  <div className="text-sm text-purple-600">{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td className="p-2 border border-purple-100 text-right text-sm w-16 text-purple-600">
                  {hour}
                </td>

                {days.map((day) => {
                  const eventsInCell = calendarEvents.filter(
                    (ev) => ev.day === day.label && ev.startTime === hour
                  );

                  return (
                    <td
                      key={`${day.label}-${hour}`}
                      className="p-2 border border-purple-100 align-top relative"
                    >
                      {eventsInCell.map((ev) => (
                        <div
                          key={ev.id}
                          className="text-sm rounded-lg px-2 py-1 mb-1 truncate shadow-md"
                          style={{
                            backgroundColor: `#34D399`,
                            color: ev.color,
                            border: `1px solid ${ev.color}80`,
                            boxShadow: `0 2px 4px ${ev.color}40`,
                          }}
                        >
                          <div className="font-semibold">{ev.title}</div>
                          <div className="text-xs">
                            {ev.startTime} – {ev.endTime}
                          </div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
