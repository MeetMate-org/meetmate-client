"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./ui/components/Sidebar";
import { Providers } from "./providers"; 
import { useScheduleModalStore } from "./store/use-schedule-store";
import ScheduleMeeting from "./ui/components/schedule-meeting/schedule-meeting";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScheduleModalOpen } = useScheduleModalStore();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Sidebar isOpen={true}>
            {children}
            {isScheduleModalOpen && <ScheduleMeeting />}
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}
