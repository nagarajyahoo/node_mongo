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

var deleteOne = (callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .deleteOne({name: 'Nagaraj M R'})
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

var findAndDeleteOne = (oid, callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .findOneAndDelete({_id: new ObjectID(oid)})
                    .then((result) => {
                        console.log(JSON.stringify(result, undefined, 2));
                    })
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    })
};

var updateName = (oid, newName, callback) => {
    MongoClient.connect(url, (err, client) => {
        try {
            if (err) {
                return console.log("Unable to connect to mongo db");
            }
            else {
                const db = client.db(users_database);
                db.collection(users_collection)
                    .findOneAndUpdate(
                        {
                            _id: new ObjectID(oid)
                        },
                        {
                            $set : {
                                name : newName
                            }
                        },
                        {
                            returnOriginal : false
                        })
                    .then((result) => {
                        console.log(JSON.stringify(result, undefined, 2));
                    })
            }
        }
        finally {
            console.log("Closing connection ...");
            client.close();
        }
    })
};

updateName('5b0f15ed71c1310454756fb6', 'old name not back');

module.exports = {
    save: saveRecord,
    getAll: allUsers,
    getByOID: getUserByOID,
    deleteByOID: deleteUserByOID
};


