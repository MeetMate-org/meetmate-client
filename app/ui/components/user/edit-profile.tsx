"use client";

import { useEditUser, useGetAccount } from "@/app/services/auth-services";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useEditProfileModalStore } from "@/app/store/use-edit-profile-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const token = localStorage.getItem("token") || "";
  const userId = localStorage.getItem("userId") || "";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { closeEditProfileModal } = useEditProfileModalStore();
  const { data: account, isLoading, error } = useGetAccount(userId, token);
  const { mutate, status, isError, error: errorMutation, isSuccess } = useEditUser(token, userId);
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const isMutating = status === "pending";

  useEffect(() => {
    if (account) {
      setUsername(account.username);
      setEmail(account.email);
    }
  }, [account]);

  // Handle cases where token or userId is missing
  if (!token || !userId) {
    return <div>Please log in to edit your profile.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading account information.</div>;
  }

  if (!account) {
    return <div>No account information found.</div>;
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      username,
      email,
    };

    mutate(updatedUser, {
      onSuccess: (data) => {
        console.log("Profile updated successfully:", data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setUser({
          id: userId,
          email: updatedUser.email,
          username: updatedUser.username,
        });
        closeEditProfileModal();
      },
      onError: (err) => {
        console.error("Failed to update profile:", err);
      },
    });
  };

  return (
    <div className="p-4 w-[70%] min-h-[90vh] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleEditUser}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            defaultValue={account.username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            defaultValue={account.email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isMutating}
        >
          {isMutating ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {isError && <p className="text-red-500 mt-2">Error: {errorMutation?.message}</p>}
      {isSuccess && <p className="text-green-500 mt-2">Profile updated successfully!</p>}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Account Information</h2>
        <p className="text-gray-700">Created at: {new Date(account.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EditProfile;