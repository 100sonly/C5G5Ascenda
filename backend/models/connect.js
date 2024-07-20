const { MongoClient } = require("mongodb");
DB_NAME = "ascendas";

async function create_connection(col_name) {
    const url = process.env.ATLAS_URI;
    const client = new MongoClient(url);
    try {
        const res = await client.connect();
        const db = DB_NAME;
        const col = db.collection(col_name);
    } catch (err) {
        console.log(err.stack);
        const col = -1;
    }
    finally {
        return [client, col];
    }
}

async function close_connection(client) {
    await client.close();
}

module.exports = {create_connection, close_connection}