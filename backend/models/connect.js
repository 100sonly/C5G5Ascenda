const { MongoClient } = require("mongodb");

DB_NAME = "ascendas";
const url = process.env.ATLAS_URI;
const client = new MongoClient(url);

async function create_connection(col_name) {
    try {
        const res = await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection(col_name);
        return [client, col];
    } catch (err) {
        console.log(err.stack);
    }
}

async function close_connection(client) {
    await client.close();
}

module.exports = {create_connection, close_connection}