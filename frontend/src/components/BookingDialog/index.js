import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BookingDialog({ open, onClose }) {
  const [bookingId, setBookingId] = React.useState('');
  const navigate = useNavigate();

  const handleBookingIdChange = (event) => {
    setBookingId(event.target.value);
  };

  const handleConfirm = () => {
    console.log('Booking ID:', bookingId);
    // Redirect to the Bookings.js page
    navigate('/bookings', { state: { bookingId } });
    onClose();
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingDialog;
