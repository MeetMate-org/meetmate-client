import React from "react";

interface Stats {
  meetings: number;
  contacts: number;
}

interface StatisticsProps {
  stats: Stats;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Statistics
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {stats.meetings}
        </p>
        <span className="text-gray-500">Meetings</span>
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {stats.contacts}
        </p>
        <span className="text-gray-500">Contacts</span>
      </div>
    </div>
  </div>
);

export default Statistics;
