"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "../api/auth";
import { useAuthStore } from "../store/use-auth-store";
import { Sidebar } from "../ui/components/sidebar";
import Header from "../ui/components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    const shortId = localStorage.getItem("shortId");

    if (!token || !shortId) {
      router.push("/auth/login");
      return;
    }

    try {
      const userData = await getUserById(token, shortId);
      if (userData?.username) {
        setUser({
          id: shortId,
          email: userData.username,
          name: userData.username,
          role: "user",
        });
      } else {
        console.error("Invalid user data:", userData);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/auth/login");
    }
  }, [router, setUser]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
