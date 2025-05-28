import React from "react";

interface WelcomeBannerProps {
  username: string;
  lastLogin: string;
  onProfileClick: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  username,
  lastLogin,
  onProfileClick,
}) => (
  <div className="col-span-full bg-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start justify-between">
    <div className="w-full sm:w-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Welcome, {username}!
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Last login: {lastLogin}
      </p>
    </div>
    <button
      onClick={onProfileClick}
      className="mt-4 sm:mt-0 px-5 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
    >
      Profile
    </button>
  </div>
);

export default WelcomeBanner;
