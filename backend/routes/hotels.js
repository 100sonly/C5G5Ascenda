const express = require('express');
var router = express.Router();
const hotelModel = require('../models/hotels.js');
const hotelController = require('../controllers/hotels.js');

router.get('/destination/:destination_id', async function(req, res, next) {
  hotelController.getHotelsByDestination(req, res);
});

router.get('/hotel/:hotel_id', async function(req, res, next) {
  hotelController.getHotelInfo(req, res);
});

router.get('/', async function(req, res, next) {
  hotelController.defaultResponse(req, res);
});


module.exports = router;
