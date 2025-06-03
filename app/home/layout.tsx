"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import WelcomeBanner from "../ui/components/welcome-banner";
import UpcomingEvents from "../ui/components/upcoming-events";
import QuickActions from "../ui/components/quick-actions";
import Statistics from "../ui/components/statisctics";
import Notifications from "../ui/components/notifications";
import Recommendations from "../ui/components/recommendations";
import RecentActivity from "../ui/components/recent-activity";
import Settings from "../ui/components/settings";
import { WeeklyHoursPicker } from "../ui/components/time-picker";


export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const username = localStorage.getItem("username");

      if (accessToken && userId) {
        setUser({ id: userId, email: email || "", username: username || "" });
        return;
      }
      router.replace("/");
    }
  }, [user, setUser, router]);

  if (!user) return null;

  // dummy data
  const dummyEvents = [
    { id: "1", title: "React Meetup", date: "2025-05-02" },
    { id: "2", title: "Online Conference", date: "2025-05-05" },
  ];
  const dummyActions = [
    { label: "New Meeting", onClick: () => {} },
    { label: "Create Group", onClick: () => {} },
    { label: "Contacts", onClick: () => {} },
  ];
  const dummyStats = { meetings: 12, contacts: 34 };
  const dummyNotifications = [
    { id: "1", message: "You have a group invitation", unread: true },
    { id: "2", message: "New message from Olena", unread: false },
  ];
  const dummyRecommendations = [
    { id: "1", name: "React Developers" },
    { id: "2", name: "Expert Roundtable" },
  ];
  const dummyActivity = [
    { id: "1", description: "Created group 'Frontend UA'" },
    { id: "2", description: "Updated profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col overflow-hidden">
        <Header/>

        <main className="flex flex-col justify-center items-center overflow-auto p-4 sm:p-6 gap-4 sm:gap-6 auto-rows-min">
          <WelcomeBanner
            username={user.username}
          />

          <div className="col-span-full md:col-start-2 md:col-span-3">
            <WeeklyHoursPicker />
          </div>
        </main>
      </div>
    </div>
  );
}
