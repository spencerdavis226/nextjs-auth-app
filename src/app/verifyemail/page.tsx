'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  // Function to verify the email using the token
  const verifyEmail = useCallback(async () => {
    try {
      await axios.post('/api/users/verifyemail', {
        token,
      });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.error('Error verifying email:', error);
    }
  }, [token]);

  // Get the token from the URL
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    setToken(urlToken || '');
  }, []);

  // This effect runs when the token changes to verify the email
  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      {verified ? (
        <div className="text-green-600 text-lg font-semibold">
          Your email has been verified! You can now{' '}
          <Link href="/login" className="text-blue-600 underline">
            log in
          </Link>
          .
        </div>
      ) : error ? (
        <div className="text-red-600 text-lg font-semibold">
          There was an error verifying your email. Please try again later.
        </div>
      ) : (
        <div className="text-gray-600 text-lg font-semibold">
          Verifying your email...
        </div>
      )}
    </div>
  );
}
