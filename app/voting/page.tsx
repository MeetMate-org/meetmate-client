"use client";

import { useMeetingsStore } from "@/app/store/use-meetings-store";
import { MeetingVoteCard } from "@/app/ui/components/voting-meeting-card.tsx";
import { useEffect, useState } from "react";
import { useFetchAttenddingMeetings } from "../hooks/use-get-meetings";

export default function VotingRoute() {
  const { meetings, setMeetings } = useMeetingsStore();
  const { data: fetchedMeetings, isLoading, isError, error } = useFetchAttenddingMeetings();
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
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {meetings.map((meeting) => 
            <MeetingVoteCard key={meeting._id} meeting={meeting} />
          )}
        </div>
      </div>
    </div>
  );
}
