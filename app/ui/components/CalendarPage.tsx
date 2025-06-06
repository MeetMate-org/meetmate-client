"use client";

import React from "react";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { CalendarMeetingCard } from "./calendar-meeting-card";

export default function CalendarPage() {
  const meetings = useMeetingsStore((state) => state.meetings);

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {!meetings || meetings.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow">
            <p className="text-gray-500">No planned meetings</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <CalendarMeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))
        )}
      </div>
    </div>
  );
} 