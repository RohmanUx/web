'use client';
import React, { useState } from 'react';
import axios from 'axios';
import withRole from '@/hoc/roleGuard';

const PostEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    totalSeats: '',
    location: '',
    ticketType: '',
    startTime: '',
    endTime: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  type FormDataKey = keyof typeof formData;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as FormDataKey]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token missing. please log in.');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key as FormDataKey]);
    }
    files.forEach((file) => formDataToSend.append('eve', file));

    try {
      const response = await axios.post(
        'http://localhost:8000/api/event/event',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          totalSeats: '',
          location: '',
          ticketType: '',
          startTime: '',
          endTime: '',
        });
        setFiles([]);
      } else {
        setError(response.data.message || 'error post event');
      }
    } catch (err) {
      setError('not occurred posting the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-950 backdrop-blur-sm shadow-md rounded-lg bg-opacity-60 my-32">
      <h2 className="text-3xl font-bold text-gray-100 mb-4 flex justify-center">Post New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="ticketType"
          placeholder="Ticket Type"
          value={formData.ticketType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="file"
          name="files"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4 text-gray-50 border-gray-400"
        />
        {loading && <p> Posting event ...</p>}
        <button
          type="submit"
          className="w-full bg-blue-900 text-gray-50 p-2 rounded mt-4 border-white border-[1px]" 
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Event'}
        </button>
      </form>
    </div>
  );
};

export default withRole(PostEventForm, 'ADMIN');
