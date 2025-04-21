"use client";

import React, { useEffect } from 'react';
import { useAuthStore } from '@/app/store/use-auth-store';
import { useMeetingsStore } from '@/app/store/use-meetings-store';
import { useFetchMeetings } from '@/app/hooks/use-get-meetings';

export const GreetingsBox = () => {
  const { user } = useAuthStore();
  const { setMeetings } = useMeetingsStore();
  const { data: meetings, isLoading, isError, error } = useFetchMeetings();

  useEffect(() => {
    if (isLoading) return; // Avoid unnecessary state updates during loading
    if (isError) {
      console.error("Error fetching meetings:", error);
      return;
    }
    if (meetings) {
      setMeetings(meetings); // Update meetings only when data is available
    }
  }, [meetings, isLoading, isError, error, setMeetings]);

  return (
    <div className="text-center mb-2 mt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Meetings</h1>
      <p className="text-gray-600">Hi, {user?.name || 'Guest'}!</p>
    </div>
  );
};