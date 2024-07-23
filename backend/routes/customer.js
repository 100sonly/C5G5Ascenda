const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer.js');
const {register, login} = require('../Controllers/customerController.js');
const app = express();

router.post('/reg', register);
router.post('/login', login)
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
  const customerID = Number(req.params.customerID);

  try {
    await customerModel.deleteCustomer(customerID);
    res.send("Deletion successful!");
  } catch (err) {
    console.log(err);
    res.send("Deletion failed :(");
  }
});

router.get('/deleteCustomerEmail/:email', async function(req, res, next) {
  // example: http://localhost:3000/customers/deleteCustomer/email#emaul.com
  const email = req.params.email;

  try {
    const customer = await customerModel.getCustomer(email)
    if (customer) {
        await customerModel.deleteCustomerEmail(email);
        res.send("Deletion successful!");
    } else {
        res.status(409).send("Email not found!")
    }
  } catch (err) {
    console.log(err);
    res.send("Deletion failed :(");
  }
});

router.get('/all', async function(req, res, next) {
  // example: http://localhost:3000/customers/all
  try {
    const all = await customerModel.getAll();
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(all);
  } catch (err) {
    console.log(err);
    res.send("Failed to fetch customers");
  }
});

router.get('/one/:email', async function(req, res) {
  // example: http://localhost:3000/one/user@email.com
  const { email } = req.params;

  try {
      const customer = await customerModel.getCustomer(email);
      if (customer) {
          res.send(customer);
      } else {
          res.status(404).send("Customer not found");
      }
  } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching customer");
  }
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
