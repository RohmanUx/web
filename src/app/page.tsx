'use client';
import Image from 'next/image';
import styles from './page.module.css';
import withAuth from '@/hoc/authGuard';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import EventList from './eventCheck/page';
import { Button } from '@/components/ui/button';
import Hero from './layout/hero';
import Footer from './layout/footer';
import CategoryList from './eventsHome/page';

const Home: React.FC = () => {
  const listImages = [
    { src: '/coldplay.jpg', alt: 'Coldplay' },
    { src: '/theweeknd.png', alt: 'The Weeknd' },
    { src: '/baby-metal.webp', alt: 'Baby Metal' },
  ];
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [events, setEvents] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextIndex = () => {
    setCurrentIndex((index) =>
      index === listImages.length - 1 ? 0 : index + 1,
    );
  };

  const previousIndex = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.get('/api/event/events');
      return data;
    },
    onSuccess: (data) => {
      console.log(data.result);
      setEvents(data.result);
    },
    onError: (error) => {
      console.log('Error fetching events:', error);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, [mutation]); // Ensure mutation is included if it changes

  return (
    <div>
      <Hero />
      <CategoryList />
      <Footer />
    </div>
  );
};

export default Home;
