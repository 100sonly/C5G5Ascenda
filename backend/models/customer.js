const { MongoClient } = require("mongodb");

const connectModel = require("./connect.js");
const customer_col_name = "customers";
let connection;


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

async function addNewCustomer(username, name, email, password_hash, bookings) {
    const userToInsert = [
        {
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

module.exports = { Customer, addNewCustomer, getAll }