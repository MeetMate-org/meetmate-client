"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo } from "../svg/icon-logo";
import { IconHome } from "../svg/icon-home";
import { IconCalender } from "../svg/icon-calendar";
import { IconLetter } from "../svg/icon-letter";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { colorPrimary } from "@/utils/utils";
import { useSidebarStore } from "@/app/store/use-sidebar-store";

interface SidebarProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md font-semibold ${
      pathname.includes(href)
        ? "bg-white text-colorPrimary"
        : "text-white hover:bg-white hover:text-colorPrimary"
    }`;

  const iconColor = (href: string) =>
    pathname.includes(href) ? colorPrimary : "#ffffff";

  const { toggleSidebar, isSidebarOpen } = useSidebarStore();

  return (
    <>
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Сайдбар */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-colorPrimary text-white z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center mb-6 w-full justify-center">
            <IconLogo color="#ffffff" />
          </div>

          <nav className="flex flex-col space-y-2 mb-8">
            <Link href="/" className={linkClasses("/home")}>
              <IconHome color={iconColor("/home")} />
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
          </nav>

          <button className="w-full border border-white text-white rounded-md px-3 py-2 mb-2 hover:bg-colorPrimary">
            + Meeting
          </button>
        </div>
      </div>

      {children}
    </>
  );
};
