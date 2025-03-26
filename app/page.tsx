"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "@/app/api/auth";

import { IconBell } from "./ui/svg/IconBell";
import { IconUserCircle } from "./ui/svg/IconUserCircle";
import { IconLogo } from "./ui/svg/IconLogo";
import { IconCalender } from "./ui/svg/IconCalendar";
import { Widget } from "./ui/svg/Widget";

import { colorDarkBlue, colorPurple } from "@/utils/utils";
import { MeetingCard } from "./ui/components/MeetingCard";
import { Sidebar } from "./ui/components/Sidebar";
import { UserInfoModal } from "./ui/components/UserInfoModal";
import WeekCalendar from "./ui/components/WeekCalendar";

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"dashboard" | "board">("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const shortId = localStorage.getItem("shortId");

    if (!token || !shortId) {
      router.push("/auth/login");
      return;
    }

    if (token && shortId) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(token, shortId);
          if (user) {
            setUsername(user.username);
          } else {
            setError("User not found.");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setError("Failed to load user data.");
        }
      };
      fetchUser();
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <header>
        <section className="flex justify-between items-center p-3.5 border-b-4 border-gray-300">
          <div className="flex items-center space-x-2">
            <button onClick={toggleSidebar} className="focus:outline-none">
              <IconLogo color={colorPurple} />
            </button>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="font-nunito font-bold text-[20px] leading-[100%] tracking-[0%] text-center text-colorDarkBlue">
                Hi, {username || "Guest"}!
              </p>
            )}
          </div>
          <div
            className="relative flex items-center space-x-4"
            ref={containerRef}
          >
            <IconBell />
            <button onClick={toggleModal} className="focus:outline-none">
              <IconUserCircle />
            </button>
            {isOpen && (
              <div className="absolute top-full right-0 mt-2">
                <UserInfoModal
                  userName="Name Surname"
                  userEmail="example@gmail.com"
                  onSettingsClick={() => console.log("Settings clicked")}
                  onLogoutClick={() => console.log("Logout clicked")}
                />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center mt-4 px-4 lg:gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center p-1 rounded ${
                activeTab === "dashboard"
                  ? "border-b-2 text-white border-colorDarkBlue bg-colorDarkBlue"
                  : "bg-white text-colorDarkBlue"
              }`}
            >
              <IconCalender
                color={activeTab === "dashboard" ? "#ffff" : colorDarkBlue}
              />
              <span className="hidden lg:inline-block ml-3">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("board")}
              className={`flex items-center p-1 rounded ${
                activeTab === "board"
                  ? "border-b-2 text-white border-colorDarkBlue bg-colorDarkBlue"
                  : "bg-white text-colorDarkBlue"
              }`}
            >
              <Widget
                color={activeTab === "board" ? "#ffff" : colorDarkBlue}
              />
              <span className="hidden lg:inline-block ml-3">Board</span>
            </button>
          </div>
          {activeTab === "dashboard" ? (
            <h2 className="mt-2 text-center text-2xl font-bold text-colorDarkBlue">
              Dashboard
            </h2>
          ) : (
            <h2 className="mt-2 text-center text-2xl font-bold text-colorDarkBlue">
              Board
            </h2>
          )}
        </section>
      </header>

      <main className="flex-1 p-4">
        <div className="hidden lg:block">
          {activeTab === "dashboard" ? (
            <WeekCalendar />
          ) : (
            <div className="border-2 border-solid border-gray-300 p-4 rounded-md">
              <h3 className="text-xl font-semibold text-colorDarkBlue mb-4">
                Board Content
              </h3>
            </div>
          )}
        </div>

        <div className="block lg:hidden">
          {activeTab === "dashboard" ? (
            <div className="flex flex-col space-y-4 justify-center items-center border-2 border-solid border-gray-300 p-4 rounded-md">
              <h3 className="text-xl font-semibold text-colorDarkBlue mb-4">
                Upcoming Meetings
              </h3>
              <MeetingCard
                meetingName="Meeting Name"
                nameSurname="Name Surname"
                duration="30 minutes"
                dateTime="11:30-12:00, Monday, May 8, 2025"
                participants={[
                  "beliwnix@gmail.com",
                  "user@gmail.com",
                  "ali@gmail.com",
                  "name.surname.ri.2024@lpnu.ua",
                ]}
                stripeColor="bg-lime-500"
                onEdit={() => console.log("Edit 1 clicked!")}
              />

              <MeetingCard
                meetingName="Another Meeting"
                nameSurname="Team Name"
                duration="1 hour"
                dateTime="14:00-15:00, Monday, May 8, 2025"
                participants={[
                  "example@gmail.com",
                  "user@gmail.com",
                  "ali@gmail.com",
                  "name.surname.ri.2024@lpnu.ua",
                ]}
                stripeColor="bg-purple-500"
                onEdit={() => console.log("Edit 2 clicked!")}
              />

              <MeetingCard
                meetingName="Morning Briefing"
                nameSurname="Name Surname"
                duration="45 minutes"
                dateTime="09:15-10:00, Tuesday, May 9, 2025"
                participants={[
                  "user1@gmail.com",
                  "user2@gmail.com",
                  "user3@gmail.com",
                  "name.surname.ri.2024@lpnu.ua",
                ]}
                stripeColor="bg-blue-500"
                onEdit={() => console.log("Edit 3 clicked!")}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-4 justify-center items-center border-2 border-solid border-gray-300 p-4 rounded-md">
              <h3 className="text-xl font-semibold text-colorDarkBlue mb-4">
                Board Content
              </h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
