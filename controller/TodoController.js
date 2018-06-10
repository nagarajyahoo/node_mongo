const express = require('express');
const bodyParser = require('body-parser');
var {Todo} = require('../mongoose_module/model/Todo.js');
var {User} = require('../mongoose_module/model/User.js');
var {mongoose} = require('../mongoose_module/mongoose/MongooseDB.js');

var app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo(req.body);
    todo.save().then((result) => {
        return res.send(result);
    }, (err) => {
        return res.send(500, {
            "err": "Failed to save todo"
        });
    });
});

app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});

module.exports = {
    app : app
};