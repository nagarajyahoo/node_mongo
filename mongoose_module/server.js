const mongoose = require('mongoose');
const {Todo} = require('./model/Todo.js');
const {User} = require('./model/User.js');

mongoose.Promise = global.Promise;

const users_database = "users";
const url = "mongodb://localhost:27017/" + users_database;
const con = mongoose.connect(url);

var newTodo = new Todo({
    text: " trimmed item in todo   ",
});

newTodo.save().then((result) => {
    console.log(JSON.stringify(result));
}, (err) => {
    console.log('Error occurred', err);
});

var user = new User({
    email: 'nagaraj.mr27@gmail.com'
});

user.save().then((result) => {
        console.log(JSON.stringify(result));
    },
    (err) => {
        console.log('Error occurred', err);
    });