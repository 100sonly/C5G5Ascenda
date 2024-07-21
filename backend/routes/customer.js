const express = require('express');
var router = express.Router();
var customerModel = require('../models/customer.js')

router.get('/addCustomer/:username/:name/:email/:password_hash', async function(req, res, next) {
  // example: http://localhost:3000/customers/addCustomer/test/somethingsomething/test2@test.com/cccccc
  const username = req.params.username;
  const name = req.params.name;
  const email = req.params.email;
  const password_hash = req.params.password_hash;
  const bookings = [];

  try {
    customerModel.addNewCustomer(username, name, email, password_hash, bookings);
    res.send("Insertion successful!")
  } catch(err) {
    console.log(err);
    res.send("Insertion failed!")
  }
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
