const { MongoClient } = require("mongodb");

const DB_NAME = "ascendas";
const url = process.env.ATLAS_URI;
const client = new MongoClient(url);

async function create_connection(col_name) {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection(col_name);
        return [client, col];
    } catch (err) {
        console.log(err.stack);
        throw err; // Re-throw the error after logging it
    }
}

async function close_connection(client) {
    try {
        await client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = {create_connection, close_connection}
