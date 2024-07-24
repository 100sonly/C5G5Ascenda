const customerModel = require('../models/customer.js');

const register = async (req, res) => {
  console.log("Received request body:", req.body);
  const { username, name, email, password } = req.body;
  const bookings = [];

  try {
    if (!username) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }

    // Check if username exists in database
    const usernameExists = await customerModel.checkUsernameExists(username);
    if (usernameExists) {
      return res.status(409).json({
        error: 'Username is already taken'
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        error: 'Password is required and should be at least 8 characters long'
      });
    }
    
    // Check if email exists in database
    const emailExist = await customerModel.checkEmailExists(email);
    if (emailExist) {
      return res.status(409).json({
        error: 'Email is already registered'
      });
    }

    await customerModel.addNewCustomer(username, name, email, password, bookings);
    res.status(201).json({ message: "Customer added successfully" });
  } catch (err) {
    console.error("Error adding customer:", err);
    res.status(500).json({ error: "Insertion failed", details: err.message });
  }
};
    
const login = async (req, res) => {
  const { username, password } = req.body;
    // Input validation
    if (!username || !password) {
      return res.status(400).json({
          error: 'Username and password are required'
      });
  }  

  try {
    const isValid = await customerModel.verifyCustomer(username, password);
    if (isValid) {
        // Login successful
        res.status(200).json({ message: "Login successful" });
    } else {
        // Login failed
        res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login' });
  }
}

async function getAllCustomers(req, res) {
  try {
    const all = await customerModel.getAll();
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(all);
  } catch (err) {
    console.log(err);
    res.send("Failed to retrieve customers.");
  }
}

async function deleteCustomerByID(req, res) {
  const customerID = Number(req.params.customerID);

  try {
    await customerModel.deleteCustomer(customerID);
    res.send("Deletion successful!");
  } catch (err) {
    console.log(err);
    res.send("Deletion failed :(");
  }
}

async function deleteCustomerByEmail(req, res) {
  const email = req.params.email;

  try {
    const customer = await customerModel.getCustomerByEmail(email)
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
}

async function getUserByEmail(req, res) {
  const { email } = req.params;

  try {
      const customer = await customerModel.getCustomerByEmail(email);
      if (customer) {
          res.send(customer);
      } else {
          res.status(404).send("Customer not found");
      }
  } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching customer");
  }
}

function defaultResponse(req, res) {
  res.send('respond with a resource');
}

module.exports = { register, login, getAllCustomers, deleteCustomerByID, deleteCustomerByEmail, getUserByEmail, defaultResponse };