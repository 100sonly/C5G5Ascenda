const express = require('express');
var router = express.Router();
var customerModel = require('../models/customer.js')

router.get('/addCustomer/:username/:name/:email/:password_hash', async function(req, res, next) {
  // example: http://localhost:3000/customers/addCustomer/test/somethingsomething/test2@test.com/cccccc
  const customerID = await customerModel.getNumCustomers();
  const username = req.params.username;
  const name = req.params.name;
  const email = req.params.email;
  const password_hash = req.params.password_hash;
  const bookings = [];

  try {
    customerModel.addNewCustomer(customerID, username, name, email, password_hash, bookings);
    res.send("Creation successful!")
  } catch(err) {
    console.log(err);
    res.send("Creation failed!")
  }
});

router.get('/deleteCustomer/:customerID', async function(req, res, next) {
  var customerID = req.params.customerID;

  try {
    customerID = Number(customerID);
    customerModel.deleteCustomer(customerID);
    res.send("Deletion successful!")
  } catch (err) {
    console.log(err);
    res.send("Deletion failed :(");
  }
});

router.get('/all', async function(req, res, next) {
  const all = await customerModel.getAll();
  res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.send(all);
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
