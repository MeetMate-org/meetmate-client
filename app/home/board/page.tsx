"use client";

import React, { useEffect } from "react";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useFetchMeetings } from "@/app/hooks/use-get-meetings";
import { BoardMeetingCard } from "@/app/ui/components/board-meeting-card";

export default function BoardRoute() {
  const { user } = useAuthStore();
  const { meetings, setMeetings } = useMeetingsStore();
  const { data: fetchedMeetings, isLoading, isError, error } = useFetchMeetings();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId && !user) {
      // Add logic to fetch user data if needed
    }

    if (isLoading) return; // Avoid unnecessary state updates during loading
    if (isError) {
      console.error("Error fetching meetings:", error);
      return;
    }
    if (fetchedMeetings) {
      setMeetings(fetchedMeetings); // Update meetings only when data is available
    }
  }, [user, fetchedMeetings, isLoading, isError, error, setMeetings]);

  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {!meetings || meetings.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow">
              <p className="text-gray-500">No planned meetings</p>
            </div>
          ) : (
            meetings.map((meeting, key) => (
              <BoardMeetingCard key={key} meeting={meeting} />
            ))
          )}
        </div>
      </div>
    </>
  );
}