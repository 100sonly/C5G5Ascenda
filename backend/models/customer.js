const { MongoClient } = require("mongodb");

const connectModel = require("./connect.js");
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
    con = await connectModel.create_connection("customers");
    client = con[0];
    col = con[1];
    const p = await col.insertMany(userToInsert);
    connectModel.close_connection(client);
    console.log(p);
}

module.exports = { Customer, addNewCustomer }