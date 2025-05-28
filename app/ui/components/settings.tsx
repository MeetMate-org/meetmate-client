import React from "react";

interface SettingsProps {
  onToggleTheme: () => void;
  onChangeLanguage: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  onToggleTheme,
  onChangeLanguage,
}) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Settings
    </h2>
    <div className="flex flex-col gap-2 sm:gap-3">
      <button
        onClick={onToggleTheme}
        className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
      >
        Toggle Dark/Light Mode
      </button>
      <button
        onClick={onChangeLanguage}
        className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
      >
        Language
      </button>
    </div>
  </div>
);

export default Settings;
