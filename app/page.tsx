"use client";

import React, { useEffect } from "react";
import Header from "@/app/ui/components/header";
import { Tabs } from "@/app/ui/components/tabs";
import { AuthModal } from "./ui/modals/auth-modal";
import { useAuthStore } from "./store/use-auth-store";

export default function Home() {
  const { user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (token && userId && !user) {
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to MeetMate</h1>
            <p>Your ultimate meeting management platform.</p>
            <Tabs>
              <div className="tab-content">
                <h2>Welcome to the Home Page</h2>
                <p>Select a tab to view different content.</p>
                
                {/* Authentication Buttons */}
                {!user && (
                  <div className="mt-6">
                    <button 
                      onClick={() => window.openAuthModal && window.openAuthModal()} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        if (window.openAuthModal) {
                          window.openAuthModal();
                          // Додаткову логіку для переключення на реєстрацію можна додати тут
                        }
                      }} 
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </main>
      </div>
      {/* Модальне вікно автентифікації */}
      <AuthModal />
    </div>
  );
}
