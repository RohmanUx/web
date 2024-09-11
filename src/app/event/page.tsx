  "use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineProfile, AiOutlineUnorderedList } from 'react-icons/ai';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 py-24 jjustify-start pt-36">
      <h1 className="text-xl sm:text-3xl md:text-3xl font-medium mb-8 md:mb-8 text-gray-900 font-sans text-center">
        Dashboard # 
      </h1>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 flex justify-center">
        <div
          onClick={() => handleNavigation('/eventCheck')}
          className="cursor-pointer p-6 bg-gray-100 border-gray-900 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
        >
          <AiOutlineUnorderedList className="text-5xl sm:text-6xl text-gray-700 mx-auto mb-4 w-20 md:w-40" />
          <h2 className="text-sm sm:text-2xl md:text-2xl font-semibold text-center text-gray-700">
            Event Control
          </h2>
        </div>

        <div
          onClick={() => handleNavigation('/dashboard/admin/profile')}
          className="cursor-pointer p-6 bg-gray-100 border-gray-900 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
        >
          <AiOutlineProfile className="text-5xl sm:text-6xl text-gray-700 mx-auto mb-4 w-20 md:w-40" />
          <h2 className="text-sm sm:text-2xl md:text-2xl font-semibold text-center text-gray-700">
            Account
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
