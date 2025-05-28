import React, { useState } from "react";
import { PlusIcon } from "../svg/icon-add";

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

export const WeeklyHoursPicker: React.FC = () => {
  const [hours, setHours] = useState<Record<DayKey, Interval[]>>(
    () =>
      days.reduce((acc, { key }) => {
        acc[key] =
          key === "sun" || key === "sat"
            ? []
            : [{ start: "09:00", end: "17:00" }];
        return acc;
      }, {} as Record<DayKey, Interval[]>)
  );

  const addInterval = (day: DayKey) =>
    setHours((prev) => ({
      ...prev,
      [day]: [...prev[day], { start: "09:00", end: "17:00" }],
    }));

  const removeInterval = (day: DayKey, idx: number) =>
    setHours((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));

  const changeTime = (
    day: DayKey,
    idx: number,
    field: "start" | "end",
    value: string
  ) =>
    setHours((prev) => {
      const updated = [...prev[day]];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, [day]: updated };
    });

  return (
    <div className="col-span-full md:col-span-3 bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
        Weekly hours
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
        {days.map(({ key, label }) => (
          <div key={key} className="space-y-2 flex flex-col">
            {/* День */}
            <div className="w-8 h-8 mx-auto rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              {label}
            </div>

            {/* Інтервали чи повідомлення */}
            {hours[key].length > 0 ? (
              <div className="space-y-2">
                {hours[key].map((intv, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-center gap-2"
                  >
                    <input
                      type="time"
                      value={intv.start}
                      onChange={(e) =>
                        changeTime(key, idx, "start", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full sm:w-24 md:w-28"
                    />
                    <span>—</span>
                    <input
                      type="time"
                      value={intv.end}
                      onChange={(e) =>
                        changeTime(key, idx, "end", e.target.value)
                      }
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
                  className="
                    mt-1
                    inline-flex
                    items-center
                    justify-center
                    mx-auto
                    text-green-600
                    hover:text-green-800
                    text-sm
                    gap-1
                  "
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
    </div>
  );
};
