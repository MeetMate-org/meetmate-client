"use client";
import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/auth";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const shortId = localStorage.getItem("shortId");

    if (!token || !shortId) {
      router.push("/auth/login");
      return;
    }

    if (token && shortId) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(token, shortId);

          if (user) {
            setUsername(user.username); 
          } else {
            setError("User not found.");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setError("Failed to load user data.");
        }
      };

      fetchUser();
    }
  }, );

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Hello, {username || "Guest"}!</p>
      )}
    </div>
  );
};

export default Home;
