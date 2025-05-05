"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUserMeetings, getAttendingMeetings, getMeetingsByUserId } from "../services/api/meetingsApi";

export const useFetchMeetings = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getMeetingsByUserId(id, token);
    },
    enabled: !!id && !!token, 
  });

  return query;
};

export const useFetchAttenddingMeetings = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: ["attendingMeetings"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getAttendingMeetings(id, token);
    },
    enabled: !!id && !!token, 
  });

  return query;
}

export const useFetchAllUserMeetings = () => {
  const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const query = useQuery({
    queryKey: ["allUserMeetings"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token is missing");
      }

      if (!id) {
        throw new Error("User ID is missing");
      }

      return getAllUserMeetings(id, token);
    },
    enabled: !!id && !!token, 
  });

  return query;
}