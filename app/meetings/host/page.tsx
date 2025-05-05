"use client";

import { useFetchMeetings } from "@/app/hooks/use-get-meetings";
import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { BoardMeetingCard } from "@/app/ui/components/board-meeting-card";
import { useEffect, useState } from "react";

export default function BoardRoute() {
  const { meetings, setMeetings } = useMeetingsStore();
  const { data: fetchedMeetings, isLoading, isError, error } = useFetchMeetings();
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
    return (
      <p className="text-gray-500">Loading...</p>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

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