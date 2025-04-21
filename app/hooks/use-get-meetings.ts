"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeetingsByUserId } from "../services/get-meetings";

export const useFetchMeetings = () => {
  const id = localStorage.getItem("id");
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