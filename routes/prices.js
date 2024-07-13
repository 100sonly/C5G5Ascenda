const express = require('express');
var router = express.Router();
const priceModel = require('../models/prices');

router.get('/destination/:destination_id/:checkin/:checkout/:lang/:currency/:guests', async function(req, res, next) {
    // example: localhost:3000/prices/destination/WD0M/2024-10-01/2024-10-07/en_US/SGD/2
    const destination_id = req.params.destination_id;
    const checkin = req.params.checkin;
    const checkout = req.params.checkout;
    const lang = req.params.lang;
    const currency = req.params.currency;
    const guests = req.params.guests;

    console.log(destination_id, checkin, checkout, lang, currency, guests);
    const partner_id = '1';
    //console.log(destination_id);
    const response = await priceModel.pricesByDestination(destination_id, checkin, checkout, lang, currency, guests, partner_id);
    res.send(response);
  });

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
