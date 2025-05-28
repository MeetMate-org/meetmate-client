"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUserMeetings, getAttendingMeetings, getMeetingsByUserId } from "../services/api/meetingsApi";

export const useFetchMeetings = () => {
  const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const query = useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getMeetingsByUserId(id, accessToken);
    },
    enabled: !!id && !!accessToken, 
  });

  return query;
};

export const useFetchAttenddingMeetings = () => {
  const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const query = useQuery({
    queryKey: ["attendingMeetings"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getAttendingMeetings(id, accessToken);
    },
    enabled: !!id && !!accessToken, 
  });

  return query;
}

export const useFetchAllUserMeetings = () => {
  const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const query = useQuery({
    queryKey: ["allUserMeetings"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getAllUserMeetings(id, accessToken);
    },
    enabled: !!id && !!accessToken, 
  });

  return query;
}