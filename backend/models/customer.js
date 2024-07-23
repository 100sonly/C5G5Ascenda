const connectModel = require("./connect.js");
const customer_col_name = "customers";
const {hashPassword, comparePassword} = require('../helpers/hash');


class Customer {
    constructor(username, name, email, password_hash) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.bookings = [];
    }
    static newCustomer(username, email, password_hash, bookings) {
        return new Customer(username, email, password_hash, bookings);
    }
}

async function addNewCustomer(username, name, email, password, bookings) {
    const password_hash = await hashPassword(password);
    const userToInsert = [
        {
            "username": username,
            "password_hash": password_hash,
            "name": name,
            "email": email,
            "bookings": bookings,
        }
    ]
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        client = con[0];
        col = con[1];
        const p = await col.insertMany(userToInsert);
        console.log(p);
    } catch (err) {
        console.log(err.stack);
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function verifyCustomer(username, password){
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        const client = con[0];
        const col = con[1];
        const customer = await col.findOne({ username: username });
        // Compare provided password with the stored hash
        const isMatch = await comparePassword(password, customer.password_hash)
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Error verifying customer:", err);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(con[0]);
        }
    }
}


async function getAll() {
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        client = con[0];
        col = con[1];
        const custJSON = await col.find().toArray();
        //console.log(custJSON);
        return custJSON;
    } catch (err) {
        console.log(err.stack);
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function getNumCustomers() {
    const cust_array = await getAll();
    return cust_array.length;
}

async function getCustomer(email) {
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        client = con[0];
        col = con[1];
        return await col.findOne({ email });
    } catch (err) {
        console.log(err.stack);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function deleteCustomer(customerID) {
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        client = con[0];
        col = con[1];
        const condition = {
            customerID: customerID,
        }
        const p = await col.deleteOne(condition);
    } catch (err) {
        console.log(err.stack);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function deleteCustomerEmail(email) {
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        client = con[0];
        col = con[1];
        const condition = {
            email: email,
        }
        const p = await col.deleteOne(condition);
    } catch (err) {
        console.log(err.stack);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(client);
        }
    }
}

async function checkEmailExists(email) {
    let con;
    try {
      con = await connectModel.create_connection(customer_col_name);
      const client = con[0];
      const col = con[1];
      
      const customer = await col.findOne({ email: email });
      return customer !== null;
    } catch (err) {
      console.error("Error checking if email exists:", err);
      throw err;
    } finally {
      if (con) {
        await connectModel.close_connection(con[0]);
      }
    }
  }

  async function checkUsernameExists(username) {
    let con;
    try {
        con = await connectModel.create_connection(customer_col_name);
        const client = con[0];
        const col = con[1];
        
        const customer = await col.findOne({ username: username });
        return customer !== null;
    } catch (err) {
        console.error("Error checking if username exists:", err);
        throw err;
    } finally {
        if (con) {
            await connectModel.close_connection(con[0]);
        }
    }
}


module.exports = { Customer, addNewCustomer, getAll, getNumCustomers, getCustomer, deleteCustomer, deleteCustomerEmail, checkEmailExists, checkUsernameExists, verifyCustomer };
