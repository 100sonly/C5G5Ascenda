const express = require('express');
var router = express.Router();
var {newBooking, getBookingId} = require("../controllers/booking.js");



router.post('/addBooking', newBooking);

router.get('/id',getBookingId);


// router.get('/addCustomer/:destination_id/:hotel_id/:start_date/:end_date/:guests/:price', async function(req, res, next) {
//     const destination_id = req.params.destination_id;
//     const hotel_id = req.params.hotel_id;
//     const start_date = req.params.start_date;
//     const end_date = req.params.end_date;
//     const guests = req.params.guests;
//     const price = req.params.price;

//     try {
//         bookingModel.addNewBooking(destination_id, hotel_id, start_date, end_date, guests, price);
//         res.send("New booking successful!");
//     } catch (err) {
//         console.log(err);
//     }
// });

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


module.exports = router;