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

async function getBookingsByEmail(email) {
    const con = await connectModel.create_connection("bookings");
    const client = con[0];
    const col = con[1];
    try {
        const booking = await col.find({ "personalInfo.emailAddress": email }).toArray();
        await connectModel.close_connection(client);
        if (!booking) {
            return null;
        }
        
        return booking;
    } catch (err) {
        console.log(err.stack);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function deleteBookingsByEmail(email) {
    let con;
    try {
        con = await connectModel.create_connection("bookings");
        client = con[0];
        col = con[1];
        const condition = {
            "personalInfo.emailAddress": email,
        }
        const p = await col.deleteMany(condition);
        return p;
    } catch (err) {
        console.log(err.stack);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

module.exports = { Booking, addNewBooking, getBookingDetails, getBookingsByEmail, deleteBookingsByEmail }