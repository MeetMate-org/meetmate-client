import React from "react";

interface Notification {
  id: string;
  message: string;
  unread: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Notifications
    </h2>
    <ul className="space-y-3 text-sm">
      {notifications.map((n) => (
        <li
          key={n.id}
          className={`flex items-center justify-between ${
            n.unread ? "font-semibold text-teal-600" : "text-gray-700"
          }`}
        >
          {n.message}
          {n.unread && (
            <span className="h-2 w-2 bg-teal-600 rounded-full ml-2" />
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Notifications;
