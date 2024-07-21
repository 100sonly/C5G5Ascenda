const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://c5g5:B86mH7O8pLdcunii@cluster0.0cnkkq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to your Atlas cluster
const client = new MongoClient(url);
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         // Get the database and collection on which to run the operation
         const db = client.db("ascendas");
         const col = db.collection("customers");
         // Create new documents                                                                                                                                         
         const peopleDocuments = [
           {
             "username": "AlanTuring",
             "password_hash": "aaaaaaaaaa",
             "name": { "first": "Alan", "last": "Turing" },
             "email": "test@test.com",                                                                                                                                 
             "bookings": [ "B10", "B20", "B05" ],
           },
           {
             "username": "GraceHopper",
             "password_hash": "bbbbb",
             "name": { "first": "Grace", "last": "Hopper" },
             "email": "something@test.com",                                                                                                                               
             "bookings": [],
           }
         ]
         // Insert the documents into the specified collection        
         const p = await col.insertMany(peopleDocuments);
         // Find the document
         const filter = { "name.last": "Turing" };
         const document = await col.findOne(filter);
         // Print results
         console.log("Document found:\n" + JSON.stringify(document));
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);