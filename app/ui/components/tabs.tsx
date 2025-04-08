"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Widget } from "../svg/icon-widget";
import { IconCalender } from "../svg/icon-calendar";
import Link from "next/link";

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const pathname = usePathname();
  const isBoard = pathname === "/home/board";
  const isCalendar = pathname === "/home/calendar";

  return (
    <>
      <div className="flex space-x-4 mb-6 justify-center">
        <Link
          href={"/home/board"}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isBoard
              ? "bg-colorPrimary text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Widget color={isBoard ? "white" : "#4B5563"} />
          Board
        </Link>
        <Link
          href={"/home/calendar"}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isCalendar
              ? "bg-colorPrimary text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <IconCalender color={isCalendar ? "white" : "#4B5563"} />
          Calendar
        </Link>
      </div>

      {children}
    </>
  );
};

Tabs.displayName = "Tabs";
