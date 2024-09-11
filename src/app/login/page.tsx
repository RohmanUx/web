'use client';
import * as React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { UserContext } from '@/contexts/UserContext';

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { user, setUser } = React.useContext(UserContext);

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const { data } = await apiCall.post('/api/auth/login', {
        email,
        password,
      });
      return data;
    },
    onSuccess: (data) => {
      setIsLoading(false);
      localStorage.setItem('token', data.result.token);
      setUser({
        email: data.result.email,
        identificationId: data.result.identificationId,
        role: data.result.role,
        points: data.result.points,
        image: data.result.image,
      });
      router.replace(data.result.role === 'ADMIN' ? '/' : '/landing');
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'Login failed');
      if (error.response?.data?.error?.errors) {
        error.response.data.error.errors.forEach((err: any) => {
          toast.error(err.msg);
        });
      }
    },
  });

  const handleLogin = () => {
    mutation.mutate();
  };

  return (
    <div className="relative w-full h-[660px] flex items-center justify-center p-5 py-40 mt-16">
      <Image
        layout="fill"
        src={'/narthan.gif'}
        alt={'Login Background'}
        objectFit="cover"
        className="absolute inset-0 -z-10"
      />
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg p-6 md:p-8 z-10 opacity-90">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Login to Your Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please login to explore your dream events.
        </p>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 transition">
            <FaGoogle className="mr-2" size={20} />
            Login with Google
          </button>
          <button className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition">
            <FaFacebookF className="mr-2" size={20} />
            Login with Facebook
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-600">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <MdOutlineEmail className="absolute left-3 top-3 text-gray-500" size={24} />
            <input
              type="email"
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-3 text-gray-500" size={24} />
            <input
              type={isVisible ? 'text' : 'password'}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
        >
          {isLoading ? <ClipLoader size={24} color="white" /> : 'Login'}
        </button>

        <div className="mt-6 text-center text-gray-600">
          <p>
            Don’t have an account? <Link href="/register" className="text-blue-600 hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
