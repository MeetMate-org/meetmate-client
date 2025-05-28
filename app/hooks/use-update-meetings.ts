import { useMutation } from "@tanstack/react-query";
import { deleteMeeting, editMeeting } from "../services/api/meetingsApi";
import { Meeting } from "../store/use-meetings-store";

export const useEditMeeting = () => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return useMutation({
    mutationFn: async ({
      meetingId,
      updatedData,
    }: {
      meetingId: string;
      updatedData: Partial<Meeting>;
    }) => {
      if (!accessToken) throw new Error("Access token is missing");
      return editMeeting(meetingId, accessToken, updatedData);
    },
  });
};

export const useDeleteMeeting = () => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return useMutation({
    mutationFn: async (meetingId: string) => {
      if (!accessToken) throw new Error("Access token is missing");
      return deleteMeeting(meetingId, accessToken);
    },
  });
};
