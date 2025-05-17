"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Hydrate user from localStorage on mount
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const username = localStorage.getItem("username");

      if (token && userId) {
        setUser({ id: userId, email: email || "", username: username || "" });
        return;
      }
      router.replace("/");
    }
  }, [user, setUser, router]);

  if (!user) return null;

  // Static dummy data
  const dummyEvents = [
    { id: "1", title: "React Meetup", date: "2025-05-02" },
    { id: "2", title: "Online Conference", date: "2025-05-05" },
  ];

  const dummyActions = [
    { label: "New Meeting", onClick: () => {} },
    { label: "Create Group", onClick: () => {} },
    { label: "Contacts", onClick: () => {} },
  ];

  const dummyStats = { meetings: 12, contacts: 34 };

  const dummyNotifications = [
    { id: "1", message: "You have a group invitation", unread: true },
    { id: "2", message: "New message from Olena", unread: false },
  ];

  const dummyRecommendations = [
    { id: "1", name: "React Developers" },
    { id: "2", name: "Expert Roundtable" },
  ];

  const dummyActivity = [
    { id: "1", description: "Created group 'Frontend UA'" },
    { id: "2", description: "Updated profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
          {/* Welcome Banner */}
          <div className="col-span-full bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                Welcome, {user.username}!!
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Last login: Today at 3:00 PM
              </p>
            </div>
            <button className="mt-4 sm:mt-0 px-5 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
              Profile
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition row-span-2">
            <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
            <ul className="space-y-3 text-sm">
              {dummyEvents.map((e) => (
                <li key={e.id} className="flex justify-between">
                  <span className="font-medium">{e.title}</span>
                  <span className="text-gray-400">
                    {new Date(e.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-2">
              {dummyActions.map((a) => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-xl font-medium mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold">{dummyStats.meetings}</p>
                <span className="text-gray-500">Meetings</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">{dummyStats.contacts}</p>
                <span className="text-gray-500">Contacts</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-xl font-medium mb-4">Notifications</h2>
            <ul className="space-y-3 text-sm">
              {dummyNotifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-center justify-between ${
                    n.unread ? "font-semibold text-teal-600" : "text-gray-700"
                  }`}
                >
                  {n.message}
                  {n.unread && (
                    <span className="h-2 w-2 bg-teal-600 rounded-full ml-2" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition col-span-full md:col-span-2">
            <h2 className="text-xl font-medium mb-4">Recommendations</h2>
            <div className="flex flex-wrap gap-3">
              {dummyRecommendations.map((r) => (
                <span
                  key={r.id}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {r.name}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <ul className="space-y-3 text-sm">
              {dummyActivity.map((a) => (
                <li key={a.id} className="text-gray-700">
                  {a.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-xl font-medium mb-4">Settings</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                Toggle Dark/Light Mode
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                Language
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
