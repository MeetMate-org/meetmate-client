'use client';

import { useAppSelector } from '../../store/store';
import { useAuth } from '@/app/hooks/use-auth';
import Link from 'next/link';

export default function UserProfile() {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const { handleLogout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <Link 
            href="/auth/login"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
} 