import React from "react";
import Header from "../ui/components/header";
import { VotingTabs } from "../ui/components/voting-tabs";

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Vote for your preferred meeting times
          </h1>

          <VotingTabs>{children}</VotingTabs>
        </main>
      </div>
    </div>
  );
}
