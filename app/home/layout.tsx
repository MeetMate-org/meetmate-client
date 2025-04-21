"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "../api/auth";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import { Tabs } from "../ui/components/tabs";
import { GreetingsBox } from "../ui/components/greetings-box";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      router.push("/auth/login");
      return;
    }

    try {
      const userData = await getUserById(token, id);
      if (userData?.username) {
        setUser({
          id: id,
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

  return (
    <div className="flex h-screen bg-gray-100">

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-8">
          <GreetingsBox />
          <Tabs>
            {children}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
