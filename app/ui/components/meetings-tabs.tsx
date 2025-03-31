"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface MeetingsTabsProps {
  children: React.ReactNode;
}

export const MeetingsTabs: React.FC<MeetingsTabsProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";
  const isAttend = pathname === "/meetings/attend";

  return (
    <>
      <div className="flex space-x-4 my-4 justify-center bg-colorPrimary py-2 rounded-lg md:bg-transparent">
        <button
          onClick={() => router.push("/meetings/host")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isHost
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-gray-600"
          }`}
        >
          <span>I'm hosting</span>
        </button>
        <button
          onClick={() => router.push("/meetings/attend")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isAttend
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-gray-600"
          }`}
        >
          <span>I'm attending</span>
        </button>
      </div>
      {children}
    </>
  );
};

MeetingsTabs.displayName = "MeetingsTabs";