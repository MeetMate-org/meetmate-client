"use client";

import { CalendarMeetingCard } from "@/app/ui/components/calendar-meeting-card";
import WeekCalendar from "@/app/ui/components/week-calendar";
import { MonthView } from "@/app/ui/components/month-view";
import { YearSummary } from "@/app/ui/components/year-summary";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { useFetchAllUserMeetings } from "../hooks/use-get-meetings";
import { useEffect, useState } from "react";

type TimeScope = "week" | "month" | "year";

export default function CalendarRoute() {
  const { meetings, setMeetings } = useMeetingsStore();
  const { data: fetchedMeetings, isLoading, isError, error } = useFetchAllUserMeetings();
  const [isClient, setIsClient] = useState(false);
  const [timeScope, setTimeScope] = useState<TimeScope>("week");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (fetchedMeetings) {
      console.log(fetchedMeetings);
      
      setMeetings(fetchedMeetings);
    }
  }, [fetchedMeetings, setMeetings]);

  if (!isClient) return null;

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
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center gap-3 mb-2 mt-5">
        {(["week", "month", "year"] as TimeScope[]).map(scope => (
          <button
            key={scope}
            onClick={() => setTimeScope(scope)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              timeScope === scope
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            {scope.charAt(0).toUpperCase() + scope.slice(1)}
          </button>
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {(!meetings || meetings.length === 0) ? (
          <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow border border-purple-100">
            <p className="text-purple-600">No planned meetings</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <CalendarMeetingCard key={meeting._id} meeting={meeting} />
          ))
        )}
      </div>

      <div className="hidden md:block p-10 pt-0">
        {meetings && timeScope === "week" && <WeekCalendar />}
        {meetings && timeScope === "month" && <MonthView meetings={meetings} />}
        {meetings && timeScope === "year" && <YearSummary meetings={meetings} />}
      </div>
    </div>
  );
}
