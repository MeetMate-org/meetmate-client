"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MeetingsPage = () => {
   const router = useRouter();
  
  useEffect(() => {
    router.push("/meetings/host");
  }, [router]);

  return (
    <div className='container mx-auto px-6 py-8'>
      <h1 className="text-2xl font-bold text-gray-800 text-center">View and manage your scheduled meetings</h1>
    </div>
  );
}
 
export default MeetingsPage;