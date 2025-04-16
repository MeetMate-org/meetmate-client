"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import { Tabs } from "../ui/components/tabs";
import { GreetingsBox } from "../ui/components/greetings-box";
import { QueryClient } from '@tanstack/react-query';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [queryClient] = useState(() => new QueryClient());

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    const shortId = localStorage.getItem("shortId");

    if (!token || !shortId) {
      router.push("/");
      return;
    }

    try {
      const userData = await queryClient.fetchQuery({
        queryKey: ['user', shortId],
        queryFn: async () => {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            throw new Error("API URL is not defined!");
          }
          
          const response = await fetch(`${apiUrl}/auth/getUserById?shortId=${shortId}`, {
            headers: {
              'x-access-token': token
            }
          });
          
          if (!response.ok) {
            throw new Error("Не вдалося отримати дані користувача");
          }
          
          return response.json();
        }
      });

      if (userData?.username) {
        setUser({
          id: shortId,
          email: userData.email || userData.username,
          name: userData.name || userData.username,
          role: userData.role || "user",
        });
      } else {
        console.error("Invalid user data:", userData);
        router.push("/");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/");
    }
  }, [router, setUser, queryClient]);

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
