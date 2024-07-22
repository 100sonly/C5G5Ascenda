const { MongoClient } = require("mongodb");

const connectModel = require("./connect.js");
const customer_col_name = "customers";
let connection;


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
    con = await connectModel.create_connection(customer_col_name);
    client = con[0];
    col = con[1];
    const p = await col.insertMany(userToInsert);
    connectModel.close_connection(client);
    console.log(p);
}

async function getAll() {
    con = await connectModel.create_connection(customer_col_name);
    client = con[0];
    col = con[1];
    const custJSON = await col.find().toArray();
    //console.log(custJSON);
    connectModel.close_connection(client);
    return custJSON;
}

async function getNumCustomers() {
    con = await connectModel.create_connection(customer_col_name);
    client = con[0];
    col = con[1];
    const cust_array = await col.find().toArray();
    return cust_array.length;
}

async function deleteCustomer(customerID) {
    con = await connectModel.create_connection(customer_col_name);
    client = con[0];
    col = con[1];
    const condition = {
        customerID: customerID,
    }
    const p = await col.deleteOne(condition);
    connectModel.close_connection(client);
}

module.exports = { Customer, addNewCustomer, getAll, getNumCustomers, deleteCustomer }