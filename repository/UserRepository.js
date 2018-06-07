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

var deleteUserByOID = (oid, callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection).deleteOne({
                    _id: new ObjectID(oid)
                }, (err, result) => {
                    if (err) {
                        return console.log("Unable insert record", err);
                    }
                    else {
                        callback(result);
                    }
                });
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    })
};

var test = (callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .deleteOne({name : 'Nagaraj M R'})
                    .then((result) => {
                        console.log(result.result);
                    })
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    })
};

test();

module.exports = {
    save: saveRecord,
    getAll: allUsers,
    getByOID: getUserByOID,
    deleteByOID: deleteUserByOID
};


