"use client"
// src/components/TransactionDetails.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Transaction = {
  id: number;
  userId: number;
  eventId: number;
  qty: number;
  total: number;
  status: string;
};

const TransactionDetails: React.FC<{ transactionId: number }> = ({ transactionId }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/transaction/${transactionId}`);
        setTransaction(response.data);
      } catch (err: any) {
        setError('Failed to fetch transaction details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
      {transaction ? (
        <div>
          <p><strong>ID:</strong> {transaction.id}</p>
          <p><strong>User ID:</strong> {transaction.userId}</p>
          <p><strong>Event ID:</strong> {transaction.eventId}</p>
          <p><strong>Quantity:</strong> {transaction.qty}</p>
          <p><strong>Total Price:</strong> {transaction.total}</p>
          <p><strong>Status:</strong> {transaction.status}</p>
        </div>
      ) : (
        <p>No transaction details available.</p>
      )}
    </div>
  );
};

export default TransactionDetails;
