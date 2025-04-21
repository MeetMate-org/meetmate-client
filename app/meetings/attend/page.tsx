"use client";

import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { BoardMeetingCard } from "@/app/ui/components/board-meeting-card";

export default function BoardRoute() {
  const meetings = useMeetingsStore((state) => state.meetings);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {!meetings || meetings.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow">
            <p className="text-gray-500">No planned meetings</p>
          </div>
        ) : (
          meetings.map((meeting, key) => (
            <BoardMeetingCard
              key={key}
              meeting={meeting}
            />
          ))
        )}
      </div>
    </div>
    </div>
  );
} 