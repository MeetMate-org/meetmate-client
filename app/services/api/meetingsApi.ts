import { MeetingData } from "@/app/types/meeting-data";
import axios from "axios";
import { addMinutes } from "date-fns";

export const getMeetingsByUserId = async (userId: string, token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/meetings/user/${userId}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return res.data;
};

export const getAttendingMeetings = async (userId: string, token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/meetings/user/attending/${userId}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return res.data;
};

export const createMeeting = async (
  meetingData: MeetingData,
  userId: string,
  token: string
) => {
  const durationInMinutes = parseInt(meetingData.duration.split(" ")[0], 10);
  const endTime = addMinutes(
    new Date(meetingData.selectedTime),
    durationInMinutes
  );

  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/meetings/create",
    {
      title: meetingData.title,
      description: meetingData.description,
      attendees: meetingData.attendees,
      startTime: meetingData.selectedTime,
      endTime: endTime.toISOString(),
      times: [
        {
          value: meetingData.selectedTime,
          votes: 0,
        },
      ],
      createdAt: new Date().toISOString(),
      organizer: userId,
      participants: meetingData.attendees,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return res.data;
};
