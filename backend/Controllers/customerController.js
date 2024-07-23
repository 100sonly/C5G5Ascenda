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

function defaultResponse(req, res) {
  res.send('respond with a resource');
}

module.exports = { register,login, getAllCustomers, defaultResponse };