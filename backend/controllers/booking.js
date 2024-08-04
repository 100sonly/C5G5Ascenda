const bookingModel = require('../models/booking.js');


const newBooking = async (req, res) => {
    //console.log("Received request body:", req.body);
    const { destination_id, hotel_id, start_date, end_date, guests, price } = req.body;
    const booking_id = hotel_id + destination_id + Math.floor(Math.random() * 10000).toString();

    try{
        await bookingModel.addNewBooking(destination_id, hotel_id, start_date, end_date, guests, price, booking_id);
        res.status(201).json({ message: "Booking added successfully" });
  } catch (err) {
        console.error("Error adding booking:", err);
        res.status(500).json({ error: "Insertion failed", details: err.message });
  }
};


const getBookingId = async (req, res) => {
    try {
      const bookingId = await bookingModel.getBookingId();
      if (!bookingId) {
        return res.status(404).json({ error: "No booking found" });
      }
      res.status(200).json(bookingId);
    } catch (err) {
      console.error("Error getting booking IDs:", err);
      res.status(500).json({ error: "Failed to retrieve booking IDs" });
    }
  };
  
module.exports = {newBooking, getBookingId};