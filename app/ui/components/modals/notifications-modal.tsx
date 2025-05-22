import { INotification } from "@/app/types/isubscribe";

const NotificationsModal = ({
  notifications,
  setIsNotificationsOpen
}: {
  notifications: INotification[];
  setIsNotificationsOpen: (isOpen: boolean) => void;
}) => {
  return (
    // Modal scrollable component to display notifications
    <div className="fixed w-full inset-0 z-50 top-0 left-0 flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="border-b border-gray-200 py-2"
            >
              <p>{notification.message.title}</p>
              <p>
                {new Date(notification.message.startTime).toLocaleString()} -{" "}
                {notification.message.duration} minutes
              </p>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
      <button
        className="absolute top-10 right-20 text-white bg-red-500 rounded-full p-2"
        onClick={() => {
          setIsNotificationsOpen(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
 
export default NotificationsModal;