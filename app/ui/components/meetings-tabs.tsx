"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MeetingsTabsProps {
  children: React.ReactNode;
}

export const MeetingsTabs: React.FC<MeetingsTabsProps> = ({ children }) => {
  const pathname = usePathname();
  const isHost = pathname === "/meetings/host";
  const isAttend = pathname === "/meetings/attend";

  return (
    <>
      <div className="flex space-x-4 my-4 justify-center bg-colorPrimary py-2 rounded-lg md:bg-transparent">
        <Link
          href={"/meetings/host"}
          className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${
            isHost
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-white md:text-gray-600"
          }`}
        >
          I&apos;m hosting
        </Link>
        <Link
          href={"/meetings/attend"}
          className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${
            isAttend
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-white md:text-gray-600"
          }`}
        >
          <span>I&apos;m attending</span>
        </Link>
      </div>
      {children}
    </>
  );
};

MeetingsTabs.displayName = "MeetingsTabs";
