const mongoClient = require('mongodb').MongoClient;

const database = "users";
const url = "mongodb://localhost:27017/" + database;

var saveRecord = (valueToSave, callback) => {
    mongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(database);
                db.collection("user_collection").insertOne(valueToSave, (err, result) => {
                    if (err) {
                        return console.log("Unable insert record", err);
                    }
                    else {
                        callback(result.ops);
                    }
                });
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    });
};


module.exports = {
    save : saveRecord
};


