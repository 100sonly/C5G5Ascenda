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
        this.booking_id = this.hotel_id + this.destination_id + Math.floor(Math.random() * 10000).toString();
    }
}

async function addNewBooking(destination_id, hotel_id, start_date, end_date, guests, price, booking_id) {
    const bookingToInsert = [
        {
            "destination_id": destination_id,
            "hotel_id": hotel_id,
            "start_date": start_date,
            "end_date": end_date,
            "guests": guests,
            "price": price,
            "booking_id": booking_id,
        }
    ]
    con = await connectModel.create_connection("bookings");
    client = con[0];
    col = con[1];
    const p = await col.insertMany(bookingToInsert);
    connectModel.close_connection(client);
    //console.log(p);
}

async function getBookingId() {
    let con;
    try {
      con = await connectModel.create_connection("bookings");
      const client = con[0];
      const col = con[1];
      const booking = await col.findOne({ destination_id: "A0HL" });
      console.log("Retrieved booking:", booking);
      return booking ? booking.booking_id : null;
    } catch (err) {
      console.error("Error getting booking ID:", err);
      throw err;
    } finally {
      if (con) {
        await connectModel.close_connection(con[0]);
      }
    }
  }
  


module.exports = { Booking, addNewBooking, getBookingId };