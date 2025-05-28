"use client";

import React, { useState } from "react";
import { Meeting } from "@/app/store/use-meetings-store";
import { IconArrow } from "./../svg/icon-arrow";

interface MonthViewProps {
  meetings: Meeting[];
}

export const MonthView: React.FC<MonthViewProps> = ({ meetings }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const firstDay = startOfMonth.getDay();

  const gridCells = [];

  for (let i = 0; i < firstDay; i++) {
    gridCells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const dayMeetings = meetings.filter((m) =>
      m.startTime.startsWith(dateStr)
    );

    gridCells.push(
      <div key={day} className="border rounded-lg p-2 bg-purple-50">
        <div className="font-bold text-sm text-purple-700 mb-1">{day}</div>
        <ul className="text-xs space-y-1">
          {dayMeetings.map((m) => (
            <li key={m._id} className="truncate">
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-100"
          aria-label="Previous month"
        >
          <IconArrow direction="left" />
        </button>

        <h3 className="text-xl font-semibold text-purple-800">
          {currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </h3>

        <button
          onClick={handleNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-100"
          aria-label="Next month"
        >
          <IconArrow direction="right" />
        </button>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium text-purple-600">
            {d}
          </div>
        ))}
        {gridCells}
      </div>
    </div>
  );
};
