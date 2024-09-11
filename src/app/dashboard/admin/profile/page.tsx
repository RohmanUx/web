"use client";
import React from 'react';

const Credentials: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 py-36 justify-start">
      <h1 className="text-3xl sm:text-3xl md:text-3xl font-medium mb-8 text-gray-900 text-center font-sans">
        Login Example # 
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {/* Admin Credentials */}
        <div className="p-6 bg-gray-100 rounded-md shadow-md  border-black border-[1px]">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center">
            Admin
          </h2>
          <div className="text-lg sm:text-xl">
            <p className="text-gray-600">
              <strong>Email:</strong> rohman@gmail.com
            </p>
            <p className="text-gray-600">
              <strong>Password:</strong> AlphaThap42@
            </p>
          </div>
        </div>

        {/* User Credentials */}
        <div className="p-6 bg-gray-100 rounded-md shadow-md  border-black border-[1px]">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center">
            User
          </h2>
          <div className="text-lg sm:text-xl">
            <p className="text-gray-600">
              <strong>Email:</strong> user@gmail.com
            </p>
            <p className="text-gray-600">
              <strong>Password:</strong> AlphaThap42@
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
  