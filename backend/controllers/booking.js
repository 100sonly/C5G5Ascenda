const bookingModel = require('../models/booking.js');


const newBooking = async (req, res) => {
    //console.log("Received request body:", req.body);
    const { personalInfo, bookingDetails, hotelData, booking_id } = req.body;
    // const booking_id = hotel_id + destination_id + Math.floor(Math.random() * 10000).toString();
    //console.log(req.body);

    try{
        await bookingModel.addNewBooking(personalInfo, bookingDetails, hotelData, booking_id);
        res.status(201).json({ message: "Booking added successfully" });
  } catch (err) {
        console.error("Error adding booking:", err);
        res.status(500).json({ error: "Insertion failed", details: err.message });
  }
};


const getBookingDetails = async (req, res) => {
    const bookingId = req.params.bookingId;
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

async function getBookingsByEmail(req, res) {
    const email = req.params.email;

    try {
        const bookings = await bookingModel.getBookingsByEmail(email);
        //console.log(bookings);

        if (bookings != []) {
            res.status(200).json(bookings);
        } else {
            //console.log(bookings);
            res.status(404).send("Bookings not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching bookings");
    }
}

async function deleteByEmail(req, res) {
    const email = req.params.email;
    try {
        const bookings = await bookingModel.deleteBookingsByEmail(email);
        // console.log(bookings);
        if (bookings.deletedCount > 0) {
            res.status(200).json("Deleted bookings");
        } else {
            //console.log(bookings);
            res.status(404).send("Bookings not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching bookings");
    }
}

async function deleteById(req, res) {
    const id = req.params.id;
    try {
        const bookings = await bookingModel.deleteBookingsById(id);
        // console.log(bookings);
        if (bookings.deletedCount > 0) {
            res.status(200).json("Deleted bookings");
        } else {
            //console.log(bookings);
            res.status(404).send("Booking not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching bookings");
    }
}



module.exports = { newBooking, getBookingDetails, getBookingsByEmail, deleteByEmail, deleteById };