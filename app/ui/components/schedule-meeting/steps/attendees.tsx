import { useState } from "react";
import NextStep from "../next-step";
import { MeetingData } from "@/app/types/meeting-data";

const Attendees = ({
  setCurrentStep,
  updateMeetingData,
  meetingData,
}: {
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"basics" | "attendees" | "date" | "confirmination">
  >;
  updateMeetingData: (data: string[]) => void;
  meetingData: MeetingData;
}) => {
  const [attendees, setAttendees] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  const addAttendee = () => {
    if (email) {
      setAttendees((prev) => [...prev, email]);
      setEmail("");
      updateMeetingData([...attendees, email]);      
    }
  };

  const handleNext = () => {
    updateMeetingData(attendees);
    setCurrentStep("date");
  };

  return (
    <div className="flex flex-col gap-4 items-end">
      <p className="text-gray-600 text-left w-full">
        Add the people you want to invite to this meeting.
      </p>
      <form onSubmit={(e) => {
        e.preventDefault();
        addAttendee();
      }} className="flex flex-col gap-2 w-full items-end">
        <input
          type="email"
          placeholder="Enter email address"
          className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
        type="submit"
          className="w-fit text-black border border-black py-2 px-4 rounded-md mt-4"
        >
          Add Attendee
        </button>
      </form>
      <ul className="w-full mt-4 flex flex-wrap gap-2">
        {meetingData.attendees.map((attendee, index) => (
          <li
            key={index}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
          >
            {attendee}
          </li>
        ))}
      </ul>
      <NextStep step="date" setCurrentStep={setCurrentStep} onClick={handleNext} />
    </div>
  );
}

export default Attendees;