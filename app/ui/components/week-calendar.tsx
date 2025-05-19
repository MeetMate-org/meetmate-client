"use client";

import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { editMeeting } from "@/app/services/api/meetingsApi";
import { IconArrow } from "../svg/icon-arrow";
import { Meeting, useMeetingsStore } from "@/app/store/use-meetings-store";
import { toast, Toaster } from "react-hot-toast";

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

export default function WeekCalendar() {
  const { meetings, setMeetings } = useMeetingsStore();
  const [isClient, setIsClient] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<{ start: Date; end: Date }>();
  const [days, setDays] = useState<{ label: string; date: string }[]>([]);

  useEffect(() => {
    setIsClient(true);
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
          date: date.toISOString().split("T")[0],
        });
      }
      setDays(days);
    }
  }, [currentWeek]);

  const handleDrop = async (meetingId: string, newDay: string, newHour: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      // Розділяємо час і модифікатор (AM/PM)
      const [time, modifier] = newHour.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      // Конвертуємо час у 24-годинний формат
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      // Створюємо дату у локальному часовому поясі
      const [year, month, day] = newDay.split("-").map(Number);
      const newStartTime = new Date(year, month - 1, day, hours, minutes); // Локальний час
      const newEndTime = new Date(newStartTime);
      newEndTime.setMinutes(newEndTime.getMinutes() + 60); // Додаємо 1 годину

      // Викликаємо API для оновлення мітингу
      await editMeeting(meetingId, token, newStartTime, newEndTime);

      // Оновлюємо стан мітингів
      setMeetings(
        meetings.map((meeting: Meeting) =>
          meeting._id === meetingId
            ? {
                ...meeting,
                startTime: newStartTime.toISOString(),
                endTime: newEndTime.toISOString(),
              }
            : meeting
        )
      );
    } catch (error) {
      console.error("Error updating meeting:", error);
      alert("Failed to update meeting.");
    }
  };

  const DraggableEvent = ({ event }: { event: CalendarEvent }) => {
    const [, drag] = useDrag(() => ({
      type: "MEETING",
      item: { id: event.id },
    }));

    const dragRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = (node: HTMLDivElement | null) => {
      drag(node);
      dragRef.current = node;
    };

    return (
      <div
        ref={combinedRef}
        className="text-sm rounded-lg px-2 py-1 mb-1 truncate shadow-md"
        style={{
          backgroundColor: event.color || "#34D399",
          color: "#fff",
          border: `1px solid ${event.color || "#34D399"}80`,
        }}
      >
        <div className="font-semibold">{event.title}</div>
        <div className="text-xs">
          {event.startTime} – {event.endTime}
        </div>
      </div>
    );
  };

  const DroppableCell = ({
    day,
    hour,
    onDrop,
    isOccupied,
    children,
  }: {
    day: string;
    hour: string;
    onDrop: (meetingId: string, newDay: string, newHour: string) => void;
    isOccupied: boolean;
    children?: React.ReactNode;
  }) => {
    const [, drop] = useDrop(() => ({
      accept: "MEETING",
      drop: (item: { id: string }) => {
        // Забороняємо додавання, якщо клітинка зайнята
        if (isOccupied) {
          toast.error("This time slot is already occupied.");
          return;
        }
        onDrop(item.id, day, hour);
      },
    }));

    return (
      <td ref={(node) => { drop(node); }} className="p-2 border border-purple-100 align-top relative">
        {children}
      </td>
    );
  };

  if (!isClient) {
    return (
      <div className="p-4 bg-white rounded-md shadow border border-purple-100 h-96">
        Loading calendar...
      </div>
    );
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

  const calendarEvents: CalendarEvent[] = meetings.map((meeting) => {
    const startDate = new Date(meeting.startTime);
    const endDate = new Date(meeting.endTime);

    // Конвертуємо час у формат AM/PM
    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const day = startDate.toISOString().split("T")[0]; // Дата у форматі YYYY-MM-DD

    return {
      id: meeting._id,
      title: meeting.title,
      day,
      startTime,
      endTime,
      color: meeting.color || "#34D399",
    };
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 bg-white rounded-md shadow border border-purple-100">
        <Toaster position="top-right" reverseOrder={false} />
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
                      (ev) => ev.day === day.date && ev.startTime === hour // Порівнюємо час у форматі AM/PM
                    );

                    return (
                      <DroppableCell
                        key={`${day.label}-${hour}`}
                        day={day.date}
                        hour={hour}
                        onDrop={handleDrop}
                        isOccupied={eventsInCell.length > 0} // Перевіряємо, чи є події у клітинці
                      >
                        {eventsInCell.map((ev) => (
                          <DraggableEvent key={ev.id} event={ev} />
                        ))}
                      </DroppableCell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DndProvider>
  );
}
