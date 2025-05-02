'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Signup</h1>
      <div className="flex flex-col space-y-6">
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border-2 border-gray-300 rounded-md p-2 w-64"
          placeholder="Username"
        />
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border-2 border-gray-300 rounded-md p-2 w-64"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border-2 border-gray-300 rounded-md p-2 w-64"
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          className="bg-blue-500 text-white rounded-md p-2 w-64"
        >
          Signup
        </button>
        <Link href="/login" className="text-blue-500">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
