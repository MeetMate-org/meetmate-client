'use client';

import { useAuth } from '@/app/hooks/use-auth';
import Link from 'next/link';
import { useAuthStore } from '@/app/store/use-auth-store';

export default function UserProfile() {
  const { user, error, isLoading } = useAuthStore();
  const { handleLogout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Функція для відкриття модального вікна авторизації
  const openAuthModal = () => {
    if (window.openAuthModal) {
      window.openAuthModal();
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h2 className="text-xl font-bold">User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">User is not authorized</p>
          <div className="flex gap-3">
            <button 
              onClick={openAuthModal}
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <Link 
              href="/"
              className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 