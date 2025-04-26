"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import Header from "../ui/components/header";
import { Tabs } from "../ui/components/tabs";
import { GreetingsBox } from "../ui/components/greetings-box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUserById } from "../services/auth-services";

const queryClient = new QueryClient();

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerHomeLayout>{children}</InnerHomeLayout>
    </QueryClientProvider>
  );
}

function InnerHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [token] = useState(() => localStorage.getItem("token"));
  const [userId] = useState(() => localStorage.getItem("userId"));

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserById(token ?? "", userId ?? "");

  useEffect(() => {
    if (!token || !userId) {
      router.push("/");
      return;
    }

    if (isError) {
      router.push("/");
      return;
    }

    if (userData) {
      setUser({
        id: userId,
        email: userData.email,
        name: userData.name,
        username: userData.username,
      });
    }
  }, [token, userId, userData, isError, router, setUser]);

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-8">
          <GreetingsBox />
          <Tabs>{children}</Tabs>
        </main>
      </div>
    </div>
  );
}
