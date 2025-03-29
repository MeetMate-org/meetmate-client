'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/app/store/use-auth-store';

export const GreetingsBox = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    console.log('PageHeader user:', user);
  }, [user]);

  return (
    <div className="text-center mb-2 mt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Meetings</h1>
      <p className="text-gray-600">Hi, {user?.name || 'Guest'}!</p>
    </div>
  )
}; 