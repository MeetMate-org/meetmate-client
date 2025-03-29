"use client";
import React from "react";
import { DAYS, HOURS } from "@/utils/utils";
import { IconArrow } from "../svg/icon-arrow";
import { useMeetingsStore } from "@/app/store/use-meetings-store";

export default function WeekCalendar() {
  const meetings = useMeetingsStore((state) => state.meetings);

  const handlePrev = () => {
    console.log("Prev week");
  };

  const handleNext = () => {
    console.log("Next week");
  };

  // Конвертуємо зустрічі у формат для календаря
  const calendarEvents = meetings.map(meeting => {
    const [date, time] = meeting.dateTime.split(', ');
    const [startTime] = time.split('-');
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      id: meeting.id,
      title: meeting.name,
      day,
      startTime,
      endTime: time.split('-')[1],
      color: meeting.stripeColor
    };
  });

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
          May 5 – May 11, 2025
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
                      key={day.label}
                      className="p-2 border border-purple-100 align-top relative"
                    >
                      {eventsInCell.map((ev) => (
                        <div
                          key={ev.id}
                          className="text-sm rounded px-1"
                          style={{ 
                            backgroundColor: ev.color + '20',
                            color: ev.color,
                            border: `1px solid ${ev.color}40`
                          }}
                        >
                          {ev.title} <br />
                          {ev.startTime} – {ev.endTime}
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
