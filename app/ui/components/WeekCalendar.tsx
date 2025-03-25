"use client";
import React from "react";
import { DAYS, HOURS, SAMPLE_EVENTS } from "@/utils/utils";
import { IconArrow } from "../svg/IconArrow";

export default function WeekCalendar() {
  const handlePrev = () => {
    console.log("Prev week");
  };

  const handleNext = () => {
    console.log("Next week");
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <div className="flex items-center justify-center space-x-6 mb-4">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
          aria-label="Previous week"
        >
            <IconArrow direction="left" />
        </button>

        <h2 className="font-semibold text-lg">
          May 5 – May 11, 2025
        </h2>

        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
          aria-label="Next week"
        >
            <IconArrow direction="right" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300 w-16"></th>
              {DAYS.map((day) => (
                <th
                  key={day.label}
                  className="p-2 border border-gray-300 text-center w-36"
                >
                  <div className="font-bold">{day.label}</div>
                  <div className="text-sm text-gray-500">{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td className="p-2 border border-gray-300 text-right text-sm w-16">
                  {hour}
                </td>

                {DAYS.map((day) => {
                  const eventsInCell = SAMPLE_EVENTS.filter(
                    (ev) => ev.day === day.label && ev.startTime === hour
                  );

                  return (
                    <td
                      key={day.label}
                      className="p-2 border border-gray-300 align-top relative"
                    >
                      {eventsInCell.map((ev) => (
                        <div
                          key={ev.id}
                          className="bg-green-200 text-sm text-green-900 rounded px-1"
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
