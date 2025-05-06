'use client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  interface UserData {
    username: string;
    email: string;
  }

  const [data, setData] = useState<UserData | null>(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout successful:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserDetails = useCallback(async () => {
    try {
      // Fetch user details from the API
      const response = await axios.get('/api/users/me');
      console.log('User details:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        // Redirect to login if unauthorized
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-semibold mb-4">Profile</h1>
      <p className="text-4xl">Profile page</p>
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      {data && (
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <p
            className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
            onClick={() => router.push(`/profile/${data.username}`)}
          >
            Username: {data.username}
          </p>
          <p
            className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
            onClick={() => router.push(`/profile/${data.email}`)}
          >
            Email: {data.email}
          </p>
        </div>
      )}
      <button
        className="px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
