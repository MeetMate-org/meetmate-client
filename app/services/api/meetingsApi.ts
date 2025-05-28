import { MeetingData } from "@/app/types/meeting-data";
import { api } from "./authApi";
import { Meeting } from "@/app/store/use-meetings-store";

const formatToISOWithOffset = (date: Date): string => {
  return date.toISOString().replace('Z', '+00:00');
};

export const getMeetingsByUserId = async (userId: string, accessToken: string) => {
  try {
    const res = await api.get(
      `/meetings/user/${userId}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const getAttendingMeetings = async (userId: string, accessToken: string) => {
  try {
    const res = await api.get(
      `/meetings/user/attending/${userId}`,
      {
        headers: {
          "x-access-token": accessToken,
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
  
    const res = await api.post(
      process.env.NEXT_PUBLIC_API_URL + "/meetings/create",
      {
        title: meetingData.title,
        description: meetingData.description,
        startTime: formatToISOWithOffset(new Date(meetingData.selectedTime)),
        duration: meetingData.duration,
        times: [
          {
            value: new Date(meetingData.selectedTime).toISOString(),
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
    const res = await api.get(
      `/meetings/user/all/${userId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching all user meetings:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

export const editMeeting = async (
  meetingId: string,
  accessToken: string,
  updatedData: Partial<Meeting>
) => {
  try {
    const res = await api.put(
      `/meetings/edit/${meetingId}`,
      updatedData,
      {
        headers: {
          "x-access-token": accessToken,
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

export const deleteMeeting = async (
  meetingId: string,
  accessToken: string,
) => {
  try {
    const res = await api.delete(
      `/meetings/delete/${meetingId}`,
      {
        headers: {
          "x-access-token": accessToken,
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