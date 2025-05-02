'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      const response = await axios.post('/api/login', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <div className="flex flex-col space-y-6">
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
          onClick={onLogin}
          className="bg-blue-500 text-white rounded-md p-2 w-64"
        >
          Login
        </button>
        <Link href="/signup" className="text-blue-500">
          Dont have an account? Signup
        </Link>
      </div>
    </div>
  );
}
