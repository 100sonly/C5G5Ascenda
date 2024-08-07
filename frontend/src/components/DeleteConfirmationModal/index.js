import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Divider } from '@mui/material';


const DeleteConfirmationModal = ({ open, onClose, onDelete }) => {
  const [inputValue, setInputValue] = useState('');
  const [deleteType, setDeleteType] = useState('email'); // 'email' or 'bookingId'

   async function handleDelete() {
        try {
            if (deleteType === 'email') {
                const delete_res = await fetch(`http://localhost:3000/booking/deleteBookingsByEmail/${inputValue}`).then((value) => console.log(value));
            } else if (deleteType === 'bookingId') {
                const delete_res = await fetch(`http://localhost:3000/booking/deleteBookingsById/${inputValue}`).then((value) => console.log(value));
            }
        } finally {

            onClose();
        }
    }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-confirmation-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" component="h2" fontFamily={'Inter'} fontWeight={'bold'}>
          Delete Booking
        </Typography>   
          <Button
            variant="text"
            color="primary"
            fontFamily={'Inter'} fontWeight={'bold'}
            onClick={() => setDeleteType((prevType) => (prevType === 'email' ? 'bookingId' : 'email'))}
          >
            Delete by {deleteType === 'email' ? 'Booking ID' : 'Email ID'}
          </Button>
          </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" fontFamily={'Inter'} fontWeight={'bold'}>
          Please enter the {deleteType === 'email' ? 'email ID' : 'booking ID'} to delete the booking.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label={deleteType === 'email' ? 'Email ID' : 'Booking ID'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ mt: 2 }}
          fontFamily={'Inter'} fontWeight={'bold'}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleDelete} fontFamily={'Inter'} fontWeight={'bold'}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose} fontFamily={'Inter'} fontWeight={'bold'}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
