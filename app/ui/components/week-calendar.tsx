"use client";
import React, { useEffect, useState } from "react";
import { DAYS, HOURS } from "@/utils/utils";
import { IconArrow } from "../svg/icon-arrow";
import { useMeetingsStore } from "@/app/store/use-meetings-store";

interface CalendarEvent {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

export default function WeekCalendar() {
  const [isClient, setIsClient] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<{ start: Date; end: Date }>();
  const meetings = useMeetingsStore((state) => state.meetings);

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
    // Ensure consistent date parsing on client side
    const [datePart, timePart] = dateStr.split(", ");
    const [startTime, endTime] = timePart.split("-");

    // Parse date in UTC to avoid timezone issues
    const date = new Date(datePart + "T00:00:00Z");
    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    return { day, startTime, endTime };
  };

  const calendarEvents: CalendarEvent[] = meetings.map((meeting) => {
    const { day, startTime, endTime } = parseMeetingDate(meeting.dateTime);

    return {
      id: meeting.id,
      title: meeting.name,
      day,
      startTime,
      endTime,
      color: meeting.stripeColor,
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
              {DAYS.map((day) => (
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

                {DAYS.map((day) => {
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
                          className="text-sm rounded px-1 mb-1 truncate"
                          style={{
                            backgroundColor: `${ev.color}20`,
                            color: ev.color,
                            border: `1px solid ${ev.color}40`,
                          }}
                        >
                          {ev.title} ({ev.startTime}–{ev.endTime})
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
