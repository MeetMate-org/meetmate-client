"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GreetingsBox } from "../ui/components/greetings-box";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/board");
  }, [router]);

  return (
    <div className="container mx-auto px-6 py-8">
      <GreetingsBox />
    </div>
  );
} 