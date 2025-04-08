"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const VotingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/voting/host");
  }, [router]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Vote for your preffered meeting times
      </h1>
    </div>
  );
};

export default VotingPage;
