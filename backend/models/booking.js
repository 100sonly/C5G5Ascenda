const { MongoClient } = require("mongodb");
const connectModel = require("./connect.js");

class Booking {
    constructor(destination_id, hotel_id, start_date, end_date, guests, price) {
        this.destination_id = destination_id;
        this.hotel_id = hotel_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.guests = guests;
        this.price = price;
    }
}

async function addNewBooking(personalInfo, bookingDetails, hotelData, booking_id) {
    const bookingToInsert = {
        personalInfo,
        bookingDetails: {
            ...bookingDetails,
            booking_id
        },
        hotelData
    };

    const [client, col] = await connectModel.create_connection("bookings");
    try {
        await col.insertOne(bookingToInsert);
    } finally {
        await connectModel.close_connection(client);
    }
}


async function getBookingDetails(bookingId) {
    try {
        const [client, col] = await connectModel.create_connection("bookings");
        const booking = await col.findOne({ "bookingDetails.bookingId": bookingId });
        await connectModel.close_connection(client);
        
        if (!booking) {
            return null;
        }
        
        return {
            personalInfo: booking.personalInfo,
            bookingDetails: booking.bookingDetails,
            hotelData: booking.hotelData
        };
    } catch (error) {
        console.error("Error fetching booking:", error);
        throw error;
    }
}

module.exports = { Booking, addNewBooking, getBookingDetails }