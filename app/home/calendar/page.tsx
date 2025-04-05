"use client";

import { CalendarMeetingCard } from "@/app/ui/components/calendar-meeting-card";
import WeekCalendar from "@/app/ui/components/week-calendar";
import { useMeetingsStore } from "@/app/store/use-meetings-store";

export default function CalendarRoute() {
  const meetings = useMeetingsStore((state) => state.meetings);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col">
        <div className="md:hidden space-y-4">
          {!meetings || meetings.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow border border-purple-100">
              <p className="text-purple-600">No planned meetings</p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <CalendarMeetingCard key={meeting.id} meeting={meeting} />
            ))
          )}
        </div>

        <div className="hidden md:block">
          <WeekCalendar />
        </div>
      </div>
    </div>
  );
}
