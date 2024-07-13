const express = require('express');
var router = express.Router();
const hotelModel = require('../models/hotels.js');

router.get('/destination/:destination_id', async function(req, res, next) {
  const destination_id = req.params.destination_id;
  console.log(destination_id);
  const all = await hotelModel.findByDestination(destination_id);
  res.send(all);
});

router.get('/', async function(req, res, next) {

  res.send('respond with a resource');
});


module.exports = router;
