"use client";

import React, { useState } from "react";
import { Meeting } from "@/app/store/use-meetings-store";

interface EditMeetingModalProps {
  open: boolean;
  onClose: () => void;
  meeting: Meeting;
  onSave: (updatedMeeting: Partial<Meeting>) => void;
}

export const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  open,
  onClose,
  meeting,
  onSave,
}) => {
  const [form, setForm] = useState({
    title: meeting.title || "",
    description: meeting.description || "",
    startTime: meeting.startTime || "",
    endTime: meeting.endTime || "",
    link: meeting.link || "",
    participants: meeting.participants.join(", ") || "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const updatedMeeting: Partial<Meeting> = {
      ...meeting,
      title: form.title,
      description: form.description,
      startTime: new Date(form.startTime).toISOString(),
    //   endTime: new Date(form.endTime).toISOString(),
      link: form.link,
      participants: form.participants.split(",").map(p => p.trim()),
    };

    onSave(updatedMeeting);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Edit Meeting</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => handleChange("title", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => handleChange("description", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-24"
          />
          <input
            type="datetime-local"
            value={form.startTime.slice(0, 16)}
            onChange={e => handleChange("startTime", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            value={form.endTime.slice(0, 16)}
            onChange={e => handleChange("endTime", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Link"
            value={form.link}
            onChange={e => handleChange("link", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Participants (comma-separated)"
            value={form.participants}
            onChange={e => handleChange("participants", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};
