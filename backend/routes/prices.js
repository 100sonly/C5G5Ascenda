const express = require('express');
var router = express.Router();
const priceModel = require('../models/prices');
const priceController = require('../controllers/prices');

router.get('/destination/:destination_id/:checkin/:checkout/:lang/:currency/:guests', async function(req, res, next) {
    // example: localhost:3000/prices/destination/WD0M/2024-10-01/2024-10-07/en_US/SGD/2
    priceController.getPricesOfHotels(req, res);
  });

  router.get('/hotel/:hotel_id/:destination_id/:checkin/:checkout/:lang/:currency/:guests', async function(req, res, next) {
    // example: localhost:3000/prices/hotel/rqRC/A0HL/2024-12-25/2025-01-07/en_US/SGD/1
    priceController.getPricesOfRooms(req, res);
  });

/* GET users listing. */
router.get('/', async function(req, res, next) {
    priceController.defaultResponse(req, res);
});

module.exports = router;
