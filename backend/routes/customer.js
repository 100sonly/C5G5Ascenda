const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer.js');
const {register, login, defaultResponse, getAllCustomers, deleteCustomerByID, deleteCustomerByEmail, getUserByEmail} = require('../controllers/customer.js');
const app = express();

router.post('/reg', register);
router.post('/login', login);
/*
router.get('/addCustomer/:username/:name/:email/:password_hash', async function(req, res, next) {
  // example: http://localhost:3000/customers/addCustomer/test/somethingsomething/test2@test.com/cccccc
  const customerID = await customerModel.getNumCustomers();
  const username = req.params.username;
  const name = req.params.name;
  const email = req.params.email;
  const password_hash = req.params.password_hash;
  const bookings = [];

  try {
    const customer = await customerModel.getCustomer(email)
    if (customer) {
        res.status(409).send("Email already Registered")
    } else {
        await customerModel.addNewCustomer(customerID, username, name, email, password_hash, bookings);
        res.send("Creation successful!");
    }
  } catch(err) {
    console.log(err);
    res.send("Creation failed!");
  }
});
*/

router.get('/deleteCustomer/:customerID', async function(req, res, next) {
  // example: http://localhost:3000/customers/deleteCustomer/cusID
  deleteCustomerByID(req, res);
});

router.get('/deleteCustomerByEmail/:email', async function(req, res, next) {
  // example: http://localhost:3000/customers/deleteCustomer/email#emaul.com
  deleteCustomerByEmail(req, res);
});

router.get('/all', async function(req, res, next) {
  // example: http://localhost:3000/customers/all
  getAllCustomers(req, res);
});

router.get('/one/:email', async function(req, res) {
  // example: http://localhost:3000/one/user@email.com
  getUserByEmail(req, res);
});

router.get('/', function(req, res, next) {
  defaultResponse(req, res);
});

module.exports = router;
