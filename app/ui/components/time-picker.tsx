"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlusIcon } from "../svg/icon-add";
import { useGetUserById, useSetFreeTime } from "@/app/services/auth-services";

type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
const days: { key: DayKey; label: string }[] = [
  { key: "sun", label: "S" },
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
];

interface Interval { start: string; end: string }
type FreeTime = Record<DayKey, Interval[]>;

export const WeeklyHoursPicker: React.FC = () => {
  const setFreeTimeMutate = useSetFreeTime();
  const { data: user } = useGetUserById(localStorage.getItem("userId") || "");

  const defaultData: FreeTime = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  // Ініціалізація станів
  const initialHours = useRef<FreeTime>(defaultData);
  const [hours, setHours] = useState<FreeTime>(defaultData);
  const [hasChanges, setHasChanges] = useState(false);

  // Завантаження даних з бекенду
  useEffect(() => {
    if (user?.freeTime) {
      // Нормалізуємо дані з бекенду
      const normalizedData: FreeTime = { ...defaultData };
      
      for (const day of days) {
        if (user.freeTime[day.key]) {
          normalizedData[day.key] = user.freeTime[day.key]
            .filter((intv: {start: string; end: string}) => intv.start && intv.end)
            .map((intv: {start: string; end: string}) => ({ 
              start: intv.start || "", 
              end: intv.end || "" 
            }));
        }
      }

      initialHours.current = normalizedData;
      setHours(normalizedData);
    }
  }, [user?.freeTime, defaultData]);

  // Перевірка змін
  useEffect(() => {
    setHasChanges(!isEqual(hours, initialHours.current));
  }, [hours]);

  const isEqual = (a: FreeTime, b: FreeTime): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const addInterval = (day: DayKey) => {
    setHours(prev => ({
      ...prev,
      [day]: [...prev[day], { start: "09:00", end: "17:00" }]
    }));
  };

  const removeInterval = (day: DayKey, idx: number) => {
    setHours(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx)
    }));
  };

  const changeTime = (
    day: DayKey,
    idx: number,
    field: "start" | "end",
    value: string
  ) => {
    setHours(prev => {
      const updated = [...prev[day]];
      
      if (value === "") {
        return {
          ...prev,
          [day]: updated.filter((_, i) => i !== idx)
        };
      }
      
      updated[idx] = { ...updated[idx], [field]: value };
      
      if (updated[idx].start === "" && updated[idx].end === "") {
        return {
          ...prev,
          [day]: updated.filter((_, i) => i !== idx)
        };
      }
      
      return { ...prev, [day]: updated };
    });
  };
  
  const handleSave = async () => {
    try {
      const filteredHours = Object.fromEntries(
        Object.entries(hours).map(([day, intervals]) => [
          day,
          intervals.filter(intv => intv.start && intv.end)
        ])
      ) as FreeTime;
      
      const token = localStorage.getItem('accessToken') || '';
      
      await setFreeTimeMutate.mutateAsync({ 
        slots: { freeTime: filteredHours }, 
        token 
      });
      
      initialHours.current = filteredHours;
      setHasChanges(false);
      
    } catch (error) {
      console.error("Failed to save free time:", error);
    }
  };

  const handleReset = () => {
    setHours(JSON.parse(JSON.stringify(initialHours.current)));
    setHasChanges(false);
  };

  return (
    <div className="col-span-full md:col-span-3 bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
        Weekly hours
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
        {days.map(({ key, label }) => (
          <div key={key} className="space-y-2 flex flex-col">
            <div className="w-8 h-8 mx-auto rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              {label}
            </div>

            {hours[key]?.length > 0 ? (
              <div className="space-y-2">
                {hours[key].map((intv, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-center gap-2">
                    <input
                      type="time"
                      value={intv.start}
                      onChange={(e) => changeTime(key, idx, "start", e.target.value)}
                      className="border rounded px-2 py-1 w-full sm:w-24 md:w-28"
                    />
                    <span>—</span>
                    <input
                      type="time"
                      value={intv.end}
                      onChange={(e) => changeTime(key, idx, "end", e.target.value)}
                      className="border rounded px-2 py-1 w-full sm:w-24 md:w-28"
                    />
                    <button
                      onClick={() => removeInterval(key, idx)}
                      className="text-red-500 hover:bg-red-50 rounded p-1"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addInterval(key)}
                  className="mt-1 inline-flex items-center justify-center mx-auto text-green-600 hover:text-green-800 text-sm gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Interval
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-gray-400 italic">No hours set</span>
                <button
                  onClick={() => addInterval(key)}
                  className="text-green-600 hover:text-green-800 p-1"
                  aria-label="Add"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {hasChanges && (
        <div className="mt-4 flex justify-end gap-2">
          <button 
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 font-montserrat py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-[#21334C] text-white font-montserrat py-2 px-4 rounded-lg cursor-pointer hover:bg-[#1a2a3d] transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};