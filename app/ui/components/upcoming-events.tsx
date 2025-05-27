import React from "react";

interface Event {
  id: string;
  title: string;
  date: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition md:row-span-2">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Upcoming Events
    </h2>
    <ul className="space-y-3 text-sm">
      {events.map((e) => (
        <li key={e.id} className="flex justify-between">
          <span className="font-medium">{e.title}</span>
          <span className="text-gray-400">
            {new Date(e.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingEvents;
