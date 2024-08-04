import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

function Bookings() {
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  return (
    <>
      <h1 className='bookings' style={{ color: '#282c34' }}>Bookings here!</h1>
      {bookingId ? (
        <p style={{ color: '#282c34' }}>Booking ID: {bookingId}</p>
      ) : (
        <p style={{ color: '#282c34' }}>No booking ID provided.</p>
      )}
    </>
  );
}

export default Bookings;
