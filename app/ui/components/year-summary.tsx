"use client";

import React from "react";
import { Meeting } from "@/app/store/use-meetings-store";

interface YearSummaryProps {
  meetings: Meeting[];
}

export const YearSummary: React.FC<YearSummaryProps> = ({ meetings }) => {
  const now = new Date();
  const year = now.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthMeetings = meetings.filter(m => {
      const d = new Date(m.startTime);
      return d.getFullYear() === year && d.getMonth() === i;
    });

    return {
      month: new Date(year, i, 1).toLocaleString("en-US", { month: "long" }),
      count: monthMeetings.length,
      meetings: monthMeetings,
    };
  });

  return (
    <div>
      <h3 className="text-xl font-semibold text-purple-800 mb-4">{year}</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {months.map((m, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-3 bg-purple-50 shadow-sm"
          >
            <div className="font-bold text-purple-700">{m.month}</div>
            <div className="text-sm text-purple-500 mb-1">
              {m.count} meeting{m.count !== 1 ? "s" : ""}
            </div>
            <ul className="text-xs max-h-20 overflow-auto">
              {m.meetings.slice(0, 4).map(meeting => (
                <li key={meeting._id} className="truncate">{meeting.title}</li>
              ))}
              {m.count > 4 && <li className="text-gray-500">...more</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
