const mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/test_db";

mongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log("Unable to connect to mongo db");
    }
    else {
        const db = client.db("test_db");
        db.collection("new_Collection").insertOne({
            name : "New Name",
            age : 27,
            location : "Washington NE37 1GZ"
        }, (err, result) => {
            if(err) {
                return console.log("Unable insert record", err);
            }
            else {
                console.log(JSON.stringify(result.ops, undefined, 2));
            }
        });

        client.close();
    }
});

