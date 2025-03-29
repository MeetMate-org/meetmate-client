"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo } from "../svg/icon-logo";
import { IconHome } from "../svg/icon-home";
import { IconCalender } from "../svg/icon-calendar";
import { IconLetter } from "../svg/icon-letter";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { colorPurple } from "@/utils/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  // Функція повертає класи для пункту меню залежно від активності
  const linkClasses = (href: string) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md font-semibold ${
      pathname === href
        ? "bg-white text-colorPurple"
        : "text-white hover:bg-colorPurple"
    }`;

  // Функція для визначення кольору іконки
  const iconColor = (href: string) =>
    pathname === href ? colorPurple : "#ffffff";

  return (
    <>
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Сайдбар */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-colorPurple text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <IconLogo color="#ffffff" />
          </div>

          <nav className="flex flex-col space-y-2 mb-8">
            <span className="ml-2 font-bold text-lg">Main menu</span>
            <Link href="/" className={linkClasses("/")}>
              <IconHome color={iconColor("/")} />
              <span>Home</span>
            </Link>
            <Link href="/meetings" className={linkClasses("/meetings")}>
              <IconCalender color={iconColor("/meetings")} />
              <span>My meetings</span>
            </Link>
            <Link href="/voting" className={linkClasses("/voting")}>
              <IconLetter color={iconColor("/voting")} />
              <span>Voting</span>
            </Link>
            <Link href="/teams" className={linkClasses("/teams")}>
              <IconUserMeeting color={iconColor("/teams")} />
              <span>My teams</span>
            </Link>
          </nav>

          <div>
            <p className="mb-3 font-bold">Actions</p>
            <button className="w-full border border-white text-white rounded-md px-3 py-2 mb-2 hover:bg-colorPurple">
              + Schedule new meeting
            </button>
            <button className="w-full border border-white text-white rounded-md px-3 py-2 hover:bg-colorPurple">
              + Create Team
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
