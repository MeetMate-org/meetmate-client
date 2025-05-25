"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/ui/components/header";
import { AuthModal } from "@/app/ui/modals/auth-modal";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useGetUserById } from "@/app/services/auth-services";
import heroBg from "@/public/images/meetmate1.jpg";
import { KeyFeaturesSection } from "./ui/components/sections/key-features-section";
import { Footer } from "./ui/components/footer";
import { TestimonialsSection } from "./ui/components/sections/slider-section";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, setUser } = useAuthStore();
  const [showAuth, setShowAuth] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
      if (storedUserId) {
        router.replace("/home");
      }
    }
  }, [router]);

  const { data: userData, isLoading, isError } = useGetUserById(userId ?? "");

  useEffect(() => {
    if (isLoading) return;
    if (userData) {
      setUser({
        id: userId!,
        email: userData.email,
        username: userData.username,
      });

      setShowAuth(false);
    } else {
      setShowAuth(true);
    }
  }, [userData, isLoading, isError, setUser, userId]);

  if (isLoading && !user) {
    return (
      <div className="flex h-screen items-center justify-center">Loading…</div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <main className="flex-1 overflow-auto bg-white">
        <section
          className="relative bg-cover bg-center h-screen flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${heroBg.src})` }}
        >
          <div className="bg-black bg-opacity-40 absolute inset-0" />
          <div className="relative z-10 px-6 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              Meet Mate: Effortless Team Scheduling
            </h1>
            <p className="mt-6 text-xl text-gray-200">
              Plan, vote, and organize your team meetings all in one place.
            </p>
            <button
              onClick={() => window.openAuthModal && window.openAuthModal()}
              className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Schedule Your First Meeting
            </button>
          </div>
        </section>

        <KeyFeaturesSection />

        <TestimonialsSection />
      </main>

      <Footer />

      {showAuth && <AuthModal />}
    </div>
  );
}
