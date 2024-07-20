const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URL);
const connectModel = require("./connect.js");
let connection;


class Customer {
    constructor(username, name, email, password_hash, bookings) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.bookings = bookings;
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
    con = await connectModel.createConnection("customers")
}

module.exports = { Customer, addNewCustomer }