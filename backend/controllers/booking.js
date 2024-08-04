const bookingModel = require('../models/booking.js');


const newBooking = async (req, res) => {
    //console.log("Received request body:", req.body);
    const { personalInfo, bookingDetails, hotelData, booking_id } = req.body;
    // const booking_id = hotel_id + destination_id + Math.floor(Math.random() * 10000).toString();

    try{
        await bookingModel.addNewBooking(personalInfo, bookingDetails, hotelData, booking_id);
        res.status(201).json({ message: "Booking added successfully" });
  } catch (err) {
        console.error("Error adding booking:", err);
        res.status(500).json({ error: "Insertion failed", details: err.message });
  }
};


const getBookingDetails = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const bookingData = await bookingModel.getBookingDetails(bookingId);
        if (!bookingData) {
            return res.status(404).json({ error: "Booking not found" });
        }
        
        // Destructure the booking data
        const { personalInfo, bookingDetails, hotelData } = bookingData;
        
        // Construct the response object
        const response = {
            bookingDetails: {
                ...bookingDetails,
                personalInfo
            },
            hotelData
        };
        
        res.status(200).json(response);
    } catch (err) {
        console.error("Error getting booking details:", err);
        res.status(500).json({ error: "Failed to retrieve booking details" });
    }
};



module.exports = {newBooking, getBookingDetails};