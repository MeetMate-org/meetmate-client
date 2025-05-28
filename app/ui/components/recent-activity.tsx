import React from "react";

interface Activity {
  id: string;
  description: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Recent Activity
    </h2>
    <ul className="space-y-3 text-sm">
      {activities.map((a) => (
        <li key={a.id} className="text-gray-700">
          {a.description}
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
