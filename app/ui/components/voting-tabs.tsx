"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface VotingTabsProps {
  children: React.ReactNode;
}

export const VotingTabs: React.FC<VotingTabsProps> = ({ children }) => {
  const pathname = usePathname();
  const isHost = pathname === "/voting/host";
  const isAttend = pathname === "/voting/attend";

  return (
    <>
      <div className="flex space-x-4 my-4 justify-center bg-colorPrimary py-2 rounded-lg md:bg-transparent">
        <Link
          href={"/voting/host"}
          className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${
            isHost
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-white md:text-gray-600"
          }`}
        >
          I'm hosting
        </Link>
        <Link
          href={"/voting/attend"}
          className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${
            isAttend
              ? "bg-black text-white hover:opacity-80"
              : "bg-transparent text-white md:text-gray-600"
          }`}
        >
          I'm attending
        </Link>
      </div>
      {children}
    </>
  );
};

VotingTabs.displayName = "VotingTabs";
