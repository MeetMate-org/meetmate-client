"use client";

import { useScheduleModalStore } from "@/app/store/use-schedule-store";
import React, { useEffect, useState } from "react";
import Basics from "./steps/basics";
import Attendees from "./steps/attendees";
import DateSelect from "./steps/date-select";
import Confirmination from "./steps/confirmination";
import { api } from "@/app/services/api/authApi";
import { format, addDays, getDay } from 'date-fns';
import { Calendar, Users, Clock, CheckCircle } from 'react-feather';

interface TimeSlot {
  start: string;
  end: string;
}

interface OptimalTimeResponse {
  optimalTimeByDay: Record<string, TimeSlot[]>;
}

const getDayOfWeek = (date: Date): string => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[getDay(date)];
};

// Функція для перетворення даних
const mapDaysToDates = (optimalTimeData: Record<string, TimeSlot[]>, startDate: Date = new Date()) => {
  const result: Record<string, string[]> = {};
  
  // Створюємо дати на 7 днів вперед
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const dayOfWeek = getDayOfWeek(currentDate);
    
    // Якщо є дані для цього дня тижня
    if (optimalTimeData[dayOfWeek]?.length > 0) {
      // Беремо всі години з доступних слотів
      result[dateKey] = optimalTimeData[dayOfWeek].flatMap(slot => {
        const hours = [];
        let currentHour = new Date(`1970-01-01T${slot.start}:00`);
        const endHour = new Date(`1970-01-01T${slot.end}:00`);
        
        while (currentHour <= endHour) {
          hours.push(format(currentHour, 'HH:mm'));
          currentHour.setHours(currentHour.getHours() + 1);
        }
        
        return hours;
      });
    } else {
      // Якщо немає даних - порожній масив
      result[dateKey] = [];
    }
  }
  
  return result;
};

const ScheduleMeeting = () => {
  const { toggleScheduleModal } = useScheduleModalStore();
  const [currentStep, setCurrentStep] = useState<StepKey>("basics");

  const [meetingData, setMeetingData] = useState({
    title: "",
    description: "",
    duration: 0,
    attendees: [] as string[],
    selectedTime: "",
    link: "",
  });

  const [suggestedTimes, setSuggestedTimes] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchOptimalTime = async () => {
      try {
        if (meetingData.attendees.length > 0) {
          const response = await api.post<OptimalTimeResponse>("/meetings/optimal-time", {
            emails: meetingData.attendees,
            organizerId: localStorage.getItem("userId") || ''
          }, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken") || ""
            }
          });
  
          const formattedTimes = mapDaysToDates(response.data.optimalTimeByDay);
          console.log(formattedTimes); // {"2025-06-05": ["09:00", "10:00"], ...}
          setSuggestedTimes(formattedTimes);
        }
      } catch (error) {
        console.error("Error fetching optimal time:", error);
        // Fallback дані
        setSuggestedTimes({
          [format(new Date(), 'yyyy-MM-dd')]: ["10:00", "14:00"],
          [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: ["09:00", "11:00"]
        });
      }
    };
  
    fetchOptimalTime();
  }, [meetingData.attendees]);

  const steps = {
    basics: (
      <Basics
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        setMeetingData={setMeetingData}
      />
    ),
    attendees: (
      <Attendees
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        setMeetingData={setMeetingData}
      />
    ),
    date: (
      <DateSelect
        suggestedTimes={suggestedTimes}
        setCurrentStep={setCurrentStep}
        meetingData={meetingData}
        setMeetingData={setMeetingData}
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
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple flex items-center justify-center ${
              currentStep === "basics" ? "bg-colorPurple text-white" : "text-colorPurple"
            }`}
          >
            <Calendar className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("attendees")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple flex items-center justify-center ${
              currentStep === "attendees" ? "bg-colorPurple text-white" : "text-colorPurple"
            }`}
          >
            <Users className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("date")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple flex items-center justify-center ${
              currentStep === "date" ? "bg-colorPurple text-white" : "text-colorPurple"
            }`}
          >
            <Clock className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <span className="flex-grow h-1 bg-colorGray rounded-md mx-2"></span>
          <button
            onClick={() => setCurrentStep("confirmination")}
            className={`w-7 md:w-14 h-7 md:h-14 rounded-full border border-colorPurple flex items-center justify-center ${
              currentStep === "confirmination" ? "bg-colorPurple text-white" : "text-colorPurple"
            }`}
          >
            <CheckCircle className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </nav>

        {/* steps content */}
        <div className="mt-4">{steps[currentStep]}</div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;