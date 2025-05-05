'use client';

import { useParams } from 'next/navigation';
import React from 'react';

export default function UserProfile() {
  const params = useParams();
  const username = params.id as string;

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-semibold mb-4">Profile</h1>
      <p className="text-4xl">
        Profile page
        <span className="font-bold text-blue-500 ml-2">{username}</span>
      </p>
    </div>
  );
}
