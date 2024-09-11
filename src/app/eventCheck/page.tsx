'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';

type Event = {
  ticketType: string;
  location: { id: number; locationName: string };
  id: number;
  title: string;
  description: string;
  totalSeats: number;
  images: { id: number; path: string; eventId: number }[];
  price: number;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
};

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/event/events`,
          {
            params: { page, limit: 10 },
          },
        );

        setEvents(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, [page]);

  const handleEdit = (eventId: number) => {
    console.log(`Edit event with id ${eventId}`);
    toast.success('Error edit', {
      className: 'bg-red-100 text-red-700 p-4 rounded-lg',
      bodyClassName: 'font-medium',
    });
  };

  const handleDelete = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/event/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event', error);
      toast.error('Error delete', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
    }
  };

  return ( 
    
    <div className='bg-purple-50'> 
    <div className="p-8 max-w-6xl mx-auto bg-purple-50">
      <h1 className="text-3xl font-medium text-gray-800 mb-7 text-center pt-28 font-sans">
        Event list # 
      </h1>
      <div className="flex mb-8 justify-center">
        <Link href="/dashboard/admin/create">
          <div className="bg-gray-800 text-gray-50 px-6 py-2 rounded-md hover:bg-blue-900 transition duration-300 font-sans">
            Create event
          </div>
        </Link> 
      </div>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out border-black border-[1px]"
          >
            <div className="relative">
              {event.images.length > 0 && (
                <Image
                  src={`http://localhost:8000${event.images[0].path}`}
                  alt={event.title}
                  height={200}
                  width={400}
                  className="object-cover w-full h-48 p-4"
                />
              )}
            </div>
            <div className="p-4">
              <div className="mb-4 h-32">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {event.description}
                </p>
              </div>
              <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{event.location.locationName}</span>
                </div>
                <div className="flex items-center mb-1">
                  <span className="font-medium">Ticket:</span>
                  <span className="ml-2">{event.ticketType}</span>
                </div>
                <div className="flex items-center mb-1">
                  <span className="font-medium">Seats:</span>
                  <span className="ml-2">{event.totalSeats}</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-end">
        <button
          className="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-900 transition duration-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="p-1 bg-gray-800 text-gray-200 rounded-full px-4 h-7 flex items-end">
          {page} page {totalPages}
        </span>

        <button
          className="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-900 transition duration-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div> </div> 
  );
};

export default EventList;
