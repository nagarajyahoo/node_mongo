const {MongoClient, ObjectID} = require('mongodb');

const users_database = "users";
const users_collection = "user_collection";
const url = "mongodb://localhost:27017/" + users_database;

var saveRecord = (valueToSave, callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection).insertOne(valueToSave, (err, result) => {
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


var allUsers = (callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .find()
                    .toArray()
                    .then((users) => {
                        callback(users);
                    }, (err) => {
                        console.log("Error occurred", err)
                    });
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    });
};

var getUserByOID = (oid, callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .find({_id: new ObjectID(oid)})
                    .toArray()
                    .then((user) => {
                        callback(user);
                    }, (err) => {
                        return console.log("Error occurred", err);
                    })
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    });
};


module.exports = {
    save: saveRecord,
    getAll: allUsers,
    byOID: getUserByOID
};


