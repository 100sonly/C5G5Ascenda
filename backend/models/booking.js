const { MongoClient } = require("mongodb");

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

async function addNewBooking(destination_id, hotel_id, start_date, end_date, guests, price) {
    const bookingToInsert = [
        {
            "destination_id": destination_id,
            "hotel_id": hotel_id,
            "start_date": start_date,
            "end_date": end_date,
            "guests": guests,
            "price": price,
        }
    ]
    con = await connectModel.create_connection("bookings");
    client = con[0];
    col = con[1];
    const p = await col.insertMany(userToInsert);
    connectModel.close_connection(client);
    //console.log(p);
}

module.exports = { Booking, addNewBooking }