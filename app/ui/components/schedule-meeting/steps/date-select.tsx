import React, { useState } from "react";
import NextStep from "../next-step";
import { MeetingData } from "@/app/types/meeting-data";

const DateSelect = ({
  suggestedTimes,
  setCurrentStep,
  updateMeetingData,
  meetingData
}: {
  suggestedTimes: { [date: string]: string[] };
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"basics" | "attendees" | "date" | "confirmination">
  >;
  updateMeetingData: (data: string) => void;
  meetingData: MeetingData
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedTime) {
      updateMeetingData(selectedTime);
      setCurrentStep("confirmination");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 h-full">
      <p className="text-gray-600 text-left w-full text-sm md:text-base">
        Select a date and time for your meeting.
      </p>

      <div className="flex flex-col gap-4 h-full">
        <h3 className="text-gray-800 font-semibold text-base md:text-lg">
          Suggested Times Based on Team Availability:
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 overflow-y-auto max-h-[30vh]">
          {Object.entries(suggestedTimes).map(([date, times]) => (
            <div key={date} className="border rounded-lg p-4 shadow-sm bg-white">
              {/* day */}
              <h4 className="text-gray-800 font-semibold text-base md:text-lg mb-2">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h4>
              <ul className="flex flex-col gap-2">
                {times.map((time) => (
                  <li key={time}>
                    <button
                      className={`px-4 py-2 rounded-lg w-full text-left text-sm md:text-base ${
                        meetingData.selectedTime === `${date} ${time}`
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedTime(`${date} ${time}`);
                        updateMeetingData(`${date} ${time}`);
                      }}
                    >
                      {time}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {meetingData.selectedTime && (
        <div className="mt-4 p-4 border rounded-lg bg-purple-100 text-purple-800 text-sm md:text-base">
          <p>
            <strong>Selected Time: </strong> 
            {
              new Date(meetingData.selectedTime).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            }
          </p>
        </div>
      )}

      <NextStep step="confirmination" setCurrentStep={setCurrentStep} onClick={handleNext} />
    </div>
  );
};

export default DateSelect;