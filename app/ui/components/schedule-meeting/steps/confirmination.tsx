import { MeetingData } from "@/app/types/meeting-data";
import { parseISO, format } from "date-fns";
const Confirmination = ({ meetingData }: { meetingData: MeetingData }) => {
  let selectedDate;
  let isValidDate = false;

  try {
    selectedDate = parseISO(meetingData.selectedTime);
    isValidDate = !isNaN(selectedDate.getTime());
  } catch (error) {
    console.error("Invalid date format:", meetingData.selectedTime);
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-bold text-colorPurple mb-6">Schedule new meeting</h1>

      <div className="w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-none md:overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Meeting Information</h2>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">📝</span>
          <p className="text-gray-700">
            <strong>Title:</strong> {meetingData.title}
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">🗒️</span>
          <p className="text-gray-700">
            <strong>Description:</strong> {meetingData.description}
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">📅</span>
          <p className="text-gray-700">
            <strong>Date:</strong>{" "}
            {isValidDate
              ? format(selectedDate as Date, "yyyy-MM-dd")
              : "Invalid date"}
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">⏰</span>
          <p className="text-gray-700">
            <strong>Time:</strong>{" "}
            {isValidDate
              ? format(selectedDate as Date, "HH:mm")
              : "Invalid time"}
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">⏳</span>
          <p className="text-gray-700">
            <strong>Duration:</strong> {meetingData.duration} minutes
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-purple-700 font-bold mr-2">👥</span>
          <p className="text-gray-700">
            <strong>Attendees:</strong> {meetingData.attendees.length} people
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {meetingData.attendees.map((attendee: string, index: number) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {attendee}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Here you can enter the Google Meet link*
        </label>
        <input
          type="text"
          placeholder="Add link for your meeting"
          className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button className="mt-4 bg-colorPurple text-white py-2 px-6 rounded-md hover:bg-purple-800">
        Schedule meeting
      </button>
    </div>
  );
};

export default Confirmination;