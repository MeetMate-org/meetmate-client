"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/app/store/use-auth-store';
import { useUpdateProfile } from '@/app/services/auth-services';

interface ProfileFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });
  const [error, setError] = useState<string | null>(null);

  const updateProfileMutation = useUpdateProfile();
  const isLoading = updateProfileMutation.status === 'pending';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('token');
    if (!token || !user) {
      setError('You are not authorized. Please try logging in again.');
      return;
    }

    updateProfileMutation.mutate(
      {
        token,
        profileData: {
          name: formData.name,
          email: formData.email,
          role: formData.role
        }
      },
      {
        onSuccess: (response) => {
          if (response.success && response.user) {
            setUser({
              ...user,
              name: response.user.name || '',
              email: response.user.email || '',
              role: response.user.role || ''
            });
            if (onSuccess) onSuccess();
          } else {
            setError(response.error || 'Failed to update profile');
          }
        },
        onError: (error) => {
          setError(error.message || 'Error updating profile');
        }
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21334C] focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21334C] focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            User Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21334C] focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-[#21334C] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}; 