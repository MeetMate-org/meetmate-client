"use client";

import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { MeetingVoteCard } from "@/app/ui/components/voting-meeting-card.tsx";

export default function AttendRoute() {
  const meetings = useMeetingsStore((state) => state.meetings);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {!meetings || meetings.length === 0 ? (
            <div className="flex items-center justify-center min-h-[480px] bg-white rounded-lg shadow">
              <p className="text-gray-500">No planned meetings</p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <MeetingVoteCard key={meeting.id} meeting={meeting} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
