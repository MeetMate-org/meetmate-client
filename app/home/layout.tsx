"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import WelcomeBanner from "../ui/components/welcome-banner";
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

  return (
    <div className="w-full flex min-h-screen bg-gray-50">
      <div className="w-full flex flex-col">
        <Header/>

        <main className="w-full flex flex-col justify-center items-center overflow-auto p-4 sm:p-6 gap-4 sm:gap-6">
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
