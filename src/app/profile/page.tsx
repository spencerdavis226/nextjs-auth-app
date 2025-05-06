'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout successful:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-semibold mb-4">Profile</h1>
      <p className="text-4xl">Profile page</p>
      <button
        className="px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
