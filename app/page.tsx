"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "./api/auth";
import { useAuthStore } from "./store/use-auth-store";

import { GreetingsBox } from "./ui/components/greetings-box";
import { Sidebar } from "./ui/components/sidebar";
import Header from "./ui/components/header";
import { Tabs } from "./ui/components/tabs";

export default function Home() {
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
      console.log('User data received:', userData);
      
      if (userData && userData.username) {
        setUser({
          id: shortId,
          email: userData.username,
          name: userData.username,
          role: 'user'
        });
        // Перенаправляємо на board за замовчуванням
        router.push("/home/board");
      } else {
        console.error('Invalid user data structure:', userData);
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
          <GreetingsBox />

          <div className="container mx-auto px-6 py-8">
            <Tabs />
          </div>
        </main>
      </div>
    </div>
  );
}
