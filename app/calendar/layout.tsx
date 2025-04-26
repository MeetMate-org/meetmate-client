"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import { useGetUserById } from "../services/auth-services";
import { CalendarMeetingCard } from "../ui/components/calendar-meeting-card";
import WeekCalendar from "../ui/components/week-calendar";
import { useMeetingsStore } from "../store/use-meetings-store";


export default function CalendarLayout() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [token] = useState(() => localStorage.getItem("token"));
  const [userId] = useState(() => localStorage.getItem("userId"));

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserById(token ?? "", userId ?? "");

  useEffect(() => {
    if (!token || !userId) {
      router.push("/");
      return;
    }

    if (isError) {
      router.push("/");
      return;
    }

    if (userData) {
      setUser({
        id: userId,
        email: userData.email,
        name: userData.name,
        username: userData.username,
      });
    }
  }, [token, userId, userData, isError, router, setUser]);
  const meetings = useMeetingsStore((state) => state.meetings);

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

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
            <WeekCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
