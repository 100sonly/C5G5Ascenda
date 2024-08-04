import React, { useState } from 'react';
import '../../App.css';

export default function Services() {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  const AddBooking = async () => {
    const hardcodedBooking = {
      destination_id: 'A0HL',
      hotel_id: 'diH7',
      start_date: new Date('2024-12-25'),
      end_date: new Date('2025-01-07'),
      guests: 2,
      price: 500
    };

    try {
      const response = await fetch('http://localhost:3000/booking/addBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hardcodedBooking),
      });

      const data = await response.json();
      setMessage(data.message || 'Booking added successfully');
    } catch (error) {
      console.error('Error adding booking:', error);
      setMessage('Failed to add booking');
    }
  };


  const getBookingId = async () => {
    try {
      console.log("Fetching booking ID...");
      const response = await fetch('http://localhost:3000/booking/id', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      const data = await response.json();
      console.log('Response data:', data);
      if (response.ok) {
        if (typeof data === 'string') {
          // If the response is directly the booking ID string
          console.log("Setting booking ID:", data);
          setBookingId(data);
          setMessage('Retrieved latest booking ID successfully');
        } else if (data && data.booking_id) {
          // If the response is an object with a booking_id property
          console.log("Setting booking ID:", data.booking_id);
          setBookingId(data.booking_id);
          setMessage('Retrieved latest booking ID successfully');
        } else {
          console.log("No booking ID in response");
          setBookingId('');
          setMessage('No booking ID found');
        }
      } else {
        throw new Error(data.message || 'Failed to get latest booking ID');
      }
    } catch (error) {
      console.error('Error getting latest booking ID:', error);
      setBookingId('');
      setMessage(error.message || 'Failed to get latest booking ID');
    }
  };

  console.log("Current bookingId state:", bookingId);

  return (
    <div className="services" style={{color: '#282c34', padding: '20px'}}>
      <h1>Services</h1>
      <button onClick={AddBooking} className="btn btn-primary mr-2">
        Add Booking (POST)
      </button>
      <button onClick={getBookingId} className="btn btn-secondary">
        Get Booking ID (GET)
      </button>
      <p className="mt-3">{message}</p>
      {bookingId && (
        <div className="mt-4">
          <h2>Booking ID:</h2>
          <p>{bookingId}</p>
        </div>
      )}
    </div>
  );
}