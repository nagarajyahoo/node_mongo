const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const users_database = "users";
const url = "mongodb://localhost:27017/" + users_database;
const con = mongoose.connect(url);

module.exports  = {
    mongoose : mongoose
};
