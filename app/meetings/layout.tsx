import React from "react";
import Header from "../ui/components/header";
import { MeetingsTabs } from "../ui/components/meetings-tabs";

export default function MeetingsLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">View and manage your scheduled meetings</h1>

          <MeetingsTabs>
            {children}
          </MeetingsTabs>
        </main>
      </div>
    </div>
  );
}