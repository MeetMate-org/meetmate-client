import React from "react";

interface Action {
  label: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: Action[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Quick Actions
    </h2>
    <div className="grid grid-cols-1 gap-2">
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          className="w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          {a.label}
        </button>
      ))}
    </div>
  </div>
);

export default QuickActions;
