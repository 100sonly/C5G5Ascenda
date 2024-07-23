const connectModel = require("./connect.js");
const customer_col_name = "customers";

class Customer {
    constructor(customerID, username, name, email, password_hash) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.bookings = [];
    }
    static newCustomer(customerID, username, email, password_hash, bookings) {
        return new Customer(customerID, username, email, password_hash, bookings);
    }
}

async function addNewCustomer(customerID, username, name, email, password_hash, bookings) {
    const userToInsert = [
        {
            "customerID": customerID,
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

module.exports = { Customer, addNewCustomer, getAll, getNumCustomers, getCustomer, deleteCustomer, deleteCustomerEmail };
