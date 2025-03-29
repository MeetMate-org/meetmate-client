"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Widget } from "../svg/icon-widget";
import { IconCalender } from "../svg/icon-calendar";

export const Tabs: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isBoard = pathname === "/home/board";
  const isCalendar = pathname === "/home/calendar";

  return (
    <div className="flex space-x-4 mb-6 justify-center">
      <button
        onClick={() => router.push("/home/board")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isBoard
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Widget color={isBoard ? "white" : "#4B5563"} />
        <span>Board</span>
      </button>
      <button
        onClick={() => router.push("/home/calendar")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isCalendar
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <IconCalender color={isCalendar ? "white" : "#4B5563"} />
        <span>Calendar</span>
      </button>
    </div>
  );
};

Tabs.displayName = "Tabs"; 