const {Todo} = require('./model/Todo.js');
const {User} = require('./model/User.js');
const {mongoose} = require('./mongoose/MongooseDB.js');



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