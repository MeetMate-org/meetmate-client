"use client";

import { CalendarMeetingCard } from "@/app/ui/components/calendar-meeting-card";
import WeekCalendar from "@/app/ui/components/week-calendar";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { useFetchAllUserMeetings } from "../hooks/use-get-meetings";
import { useEffect, useState } from "react";

export default function CalendarRoute() {
  const { meetings, setMeetings } = useMeetingsStore();
  const { data: fetchedMeetings, isLoading, isError, error } = useFetchAllUserMeetings();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (fetchedMeetings) {
      setMeetings(fetchedMeetings);
    }
  }, [fetchedMeetings, setMeetings]);

  if (!isClient) {
    return null; 
  }

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="md:hidden space-y-4">
        {!meetings || meetings.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow border border-purple-100">
            <p className="text-purple-600">No planned meetings</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <CalendarMeetingCard key={meeting._id} meeting={meeting} />
          ))
        )}
      </div>

      <div className="hidden md:block">
        {meetings && <WeekCalendar meetings={meetings} />}
      </div>
    </div>
  );
}
