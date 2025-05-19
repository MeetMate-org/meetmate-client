import { MeetingData } from "@/app/types/meeting-data";
import axios from "axios";

export const getMeetingsByUserId = async (userId: string, token: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/meetings/user/${userId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const getAttendingMeetings = async (userId: string, token: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/meetings/user/attending/${userId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  
    return res.data;
  } catch (error) {
    console.error("Error fetching attending meetings:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const createMeeting = async (
  meetingData: MeetingData,
  userId: string,
  token: string,
  userName: string
) => {
  try {
  
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/meetings/create",
      {
        title: meetingData.title,
        description: meetingData.description,
        attendees: meetingData.attendees,
        startTime: meetingData.selectedTime,
        duration: meetingData.duration,
        times: [
          {
            value: meetingData.selectedTime,
            votes: 0,
          },
        ],
        createdAt: new Date().toISOString(),
        organizer: userId,
        organizerName: userName,
        participants: meetingData.attendees,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  
    return res.data;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const getAllUserMeetings = async (userId: string, token: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/meetings/user/all/${userId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching all user meetings:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

export const editMeeting = async (
  meetingId: string,
  token: string,
  startTime: Date,
  endTime: Date
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/meetings/edit/${meetingId}`,
      {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error editing meeting:", error);
    throw error;
  }
};