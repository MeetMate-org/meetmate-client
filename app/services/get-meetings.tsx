import axios from "axios"

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
}

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
}