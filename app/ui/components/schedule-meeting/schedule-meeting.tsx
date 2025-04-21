"use client";

import { useScheduleModalStore } from "@/app/store/use-schedule-store";
import React, { useState } from "react";
import Basics from "./steps/basics";
import Attendees from "./steps/attendees";
import DateSelect from "./steps/date-select";
import Confirmination from "./steps/confirmination";

const ScheduleMeeting = () => {
  const { toggleScheduleModal } = useScheduleModalStore();
  const [currentStep, setCurrentStep] = useState<StepKey>("basics");

  const [meetingData, setMeetingData] = useState({
    title: "",
    description: "",
    duration: "",
    attendees: [] as string[],
    selectedTime: "",
  });

  const steps = {
    basics: (
      <Basics
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        updateMeetingData={(data) =>
          setMeetingData((prev) => ({ ...prev, ...data }))
        }
      />
    ),
    attendees: (
      <Attendees
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        updateMeetingData={(data) =>
          setMeetingData((prev) => ({ ...prev, attendees: data }))
        }
      />
    ),
    date: (
      <DateSelect
        suggestedTimes={{
          "2025-05-04": ["10:00", "12:00", "14:00"],
          "2025-05-05": ["10:30", "13:00", "15:00"],
          "2025-05-06": ["11:30", "14:00", "21:00"],
          "2025-05-07": ["11:30", "14:00", "21:00"],
        }}
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        updateMeetingData={(data) =>
          setMeetingData((prev) => ({ ...prev, selectedTime: data }))
        }
      />
    ),
    confirmination: <Confirmination meetingData={meetingData} setMeetingData={setMeetingData} />,
  };

  type StepKey = keyof typeof steps;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="w-full h-full md:w-[80%] md:h-[90vh] bg-white rounded-lg shadow-md overflow-y-auto p-6">
        <div className="w-full flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold">Schedule a Meeting</h1>
          <button
            className="bg-[#F2F2F2] py-2 px-4 font-montserrat"
            onClick={toggleScheduleModal}
          >
            Close
          </button>
        </div>
        <h1 className="capitalize text-colorPurple font-bold">{currentStep}</h1>
        {/* steps nav */}
        <nav className="w-full flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentStep("basics")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple ${
              currentStep === "basics" ? "bg-colorPurple" : ""
            }`}
          ></button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("attendees")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple ${
              currentStep === "attendees" ? "bg-colorPurple" : ""
            }`}
          ></button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("date")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple ${
              currentStep === "date" ? "bg-colorPurple" : ""
            }`}
          ></button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("confirmination")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple ${
              currentStep === "confirmination" ? "bg-colorPurple" : ""
            }`}
          ></button>
        </nav>

        {/* steps content */}
        <div className="mt-4">{steps[currentStep]}</div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;