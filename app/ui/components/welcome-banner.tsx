import React from "react";

interface WelcomeBannerProps {
  username: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  username,
}) => (
  <div className="w-full col-span-full bg-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start justify-center">
    <div className="w-full sm:w-auto flex justify-center">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Welcome, {username}!
      </h1>
    </div>
  </div>
);

export default WelcomeBanner;
