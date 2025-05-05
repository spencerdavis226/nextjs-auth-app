'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response.data);
      toast.success('Login successful');

      // Get username from response and redirect to user-specific profile page
      const { username } = response.data;
      router.push(`/profile/${username}`);
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">
        {loading ? 'Loading...' : 'Login'}
      </h1>
      <form onSubmit={onLogin} className="flex flex-col space-y-6">
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
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-64"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? 'Enter your email and password' : 'Login'}
        </button>
        <Link href="/signup" className="text-blue-500">
          Dont have an account? Signup
        </Link>
      </form>
    </div>
  );
}
