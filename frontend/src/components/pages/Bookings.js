import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

function Bookings() {
  const location = useLocation();
  const { bookingDetails, hotelData } = location.state || {};

  return (
    <>
      <h1 className='bookings' style={{ color: '#282c34' }}>Booking Details</h1>
      {bookingDetails && hotelData ? (
        <div style={{ color: '#282c34' }}>
          <h2>Booking Information</h2>
          <p>Booking ID: {bookingDetails.booking_id}</p>
          <p>Room Type: {bookingDetails.roomName}</p>
          <p>Check-in: {bookingDetails.checkIn.date} at {bookingDetails.checkIn.time}</p>
          <p>Check-out: {bookingDetails.checkOut.date} at {bookingDetails.checkOut.time}</p>
          <p>Number of Nights: {bookingDetails.nights}</p>
          <p>Number of Rooms: {bookingDetails.numberOfRooms}</p>
          <p>Price: ${bookingDetails.price}</p>

          <h2>Personal Information</h2>
          <p>Name: {bookingDetails.personalInfo.salutation} {bookingDetails.personalInfo.firstName} {bookingDetails.personalInfo.lastName}</p>
          <p>Email: {bookingDetails.personalInfo.emailAddress}</p>
          <p>Phone: {bookingDetails.personalInfo.phoneNumber}</p>
          {bookingDetails.personalInfo.specialRequests && (
            <p>Special Requests: {bookingDetails.personalInfo.specialRequests}</p>
          )}

          <h2>Hotel Information</h2>
          <p>Hotel Name: {hotelData.hotelName}</p>
          <p>Address: {hotelData.hotelAddress}</p>
          <p>Rating: {hotelData.hotelRating} stars</p>
          <h3>Amenities:</h3>
          {/* Render amenities here */}
        </div>
      ) : (
        <p style={{ color: '#282c34' }}>Booking details or hotel data is missing.</p>
      )}
    </>
  );
}

export default Bookings;