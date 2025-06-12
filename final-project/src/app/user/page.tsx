// app/user/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface User {
  name: string;
  email: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: 'Juan Pérez',
        email: 'juan.perez@ejemplo.com',
      });
    }, 200);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  const handleSignOut = () => {
    toast.success('Signed out');
   
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="bottom-center" />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-6">
    
        <div className="mx-auto w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-semibold">
          {initials}
        </div>

    
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500">Member since June 2025</p>

      
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/my-orders"
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-600 hover:text-white transition-colors"
          >
            Back to Catalog
          </Link>
          <Link
            href="/profile/edit"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
