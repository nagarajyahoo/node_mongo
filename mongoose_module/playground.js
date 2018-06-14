const {ObjectID} = require('mongodb');
const {User} = require('../mongoose_module/model/User');
const {Todo} = require('../mongoose_module/model/Todo');
const {mongoose} = require('../mongoose_module/mongoose/MongooseDB');

var userId = '5b1bb6d4352a940342c41346';
var todoId = '5b1d9123cf0923046ece18f3';

if (ObjectID.isValid(todoId)) {
    Todo.findById(todoId)
        .then((todo) => {
            if (!todo) {
                return console.log("No results found");
            }
            console.log('User by ID', todo);
        })
        .catch((e) => {
            console.log("error", e);
        });
} else {
    console.log(`INVALID ${id}`);
}