'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const onSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('User created:', response.data);
      router.push('/login');
    } catch (error) {
      toast.error('Error signing up user');
      console.error('Error signing up user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">
        {loading ? 'Signing up...' : 'Signup'}
      </h1>
      <form onSubmit={onSignup} className="flex flex-col space-y-6">
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
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-64"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? 'Enter your details' : 'Signup'}
        </button>
        <Link href="/login" className="text-blue-500">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
