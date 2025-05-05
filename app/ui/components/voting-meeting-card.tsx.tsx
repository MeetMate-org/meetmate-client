"use client";

import { useState, useEffect } from "react";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDeadline } from "../svg/icon-deadline";
import { IconTeam } from "../svg/icon-team";
import { IconCircle } from "../svg/icon-circle";
import { Meeting } from "@/app/store/use-meetings-store";

export interface VotingCardProps {
  meeting: Meeting;
}

export const MeetingVoteCard: React.FC<VotingCardProps> = ({meeting}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  const totalVotes = meeting.times.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const handleVote = () => {
    if (selectedIndex !== null) {
      setVoted(true);
      // Тут логіка відправки голосу
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-green-300 w-full max-w-xs md:max-w-2xl p-4 mx-auto flex flex-col justify-between min-h-[480px] mt-4">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
      </div>

      <div>
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <IconUserMeeting />
            <span>{meeting.participants.length} attendees</span>
          </div>
          <div className="flex items-center space-x-1">
            <IconDeadline />
            <span>Deadline: {new Date(meeting.endTime).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Mobile meta info */}
      <div className="flex flex-col space-y-1 md:hidden mt-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <IconUserMeeting />
          <span>{meeting.participants.length} attendees</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconTeam color="#5E00FF" />
          <span>{meeting.teamName}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <IconDeadline />
          <span>Deadline: {meeting.deadline}</span>
        </div>
      </div>

      <hr className="my-2 border-t border-gray-300" />

      <div className="space-y-2">
        {meeting.times.map((option, index) => {
          const percentage = totalVotes ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              onClick={() => !voted && setSelectedIndex(index)}
              className="cursor-pointer space-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-2">
                  <IconCircle
                    filled={isSelected}
                    color={isSelected ? "#7C3AED" : "#E5E7EB"}
                  />
                  <span className="text-sm text-gray-800">{option.value}</span>
                </div>
                <span className="text-sm text-gray-500 mt-1 md:mt-0 md:ml-2 whitespace-nowrap">
                  {option.value} {option.votes === 1 ? "vote" : "votes"}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <hr className="my-2 border-t border-gray-300" />

      <button
        disabled={selectedIndex === null || voted}
        onClick={handleVote}
        className={`mt-6 w-full py-2 rounded-md font-medium transition ${
          selectedIndex !== null && !voted
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {voted ? "Voted" : "Submit Vote"}
      </button>
    </div>
  );
};
