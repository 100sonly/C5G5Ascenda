import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BookingDialog({ open, onClose }) {
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookingIdChange = (event) => {
    setBookingId(event.target.value);
    setError(''); // Clear any previous errors when the input changes
  };

  const handleConfirm = async () => {
    if (!bookingId.trim()) {
      setError('Please enter a booking ID');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/booking/${bookingId}`);
      if (!response.ok) {
        throw new Error('Booking not found');
      }
      const data = await response.json();
      // Assuming the API now returns { bookingDetails, hotelData }
      navigate('/bookings', { 
        state: { 
          bookingDetails: data.bookingDetails,
          hotelData: data.hotelData
        } 
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Enter Booking ID"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Please enter your booking ID to view your booking details.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="bookingId"
          label="Booking ID"
          type="text"
          fullWidth
          variant="outlined"
          value={bookingId}
          onChange={handleBookingIdChange}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingDialog;