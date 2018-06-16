const express = require('express');
const bodyParser = require('body-parser');
var {Todo} = require('../mongoose_module/model/Todo.js');
var {User} = require('../mongoose_module/model/User.js');
var {mongoose} = require('../mongoose_module/mongoose/MongooseDB.js');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo(req.body);
    todo.save().then((result) => {
        return res.status(200).send(result);
    }, (err) => {
        return res.status(400).send({
            "err": "Check input values"
        });
    });
});

app.get('/todos', (req, res) => {
    var errorResponse = {
        "err": "Error occurred"
    };

    Todo.find({}).then(
        (results) => {
            res.status(200).send({
                "values": results,
                "count": results.length
            });
        },
        (error) => {
            res.status(500).send(error)
        }
    )
});

app.get('/todos/:todoId', (req, res) => {
    var todoId = req.params.todoId;
    if (ObjectID.isValid(todoId)) {
        Todo.findById(todoId)
            .then((todo) => {
                if (todo) {
                    return res.status(200).send(todo);
                }
                else {
                    return res.status(404).send({
                        "message": "No results found"
                    });
                }
            })
            .catch((e) => {
                return res.status(500).send(e);
            });
    }
    else {
        return res.status(400).send({
            "message": "incorrect todo ID"
        });
    }
});

app.delete('/todos/:id', (req, res) => {
    var todoId = req.params.id;
    if (ObjectID.isValid(todoId)) {
        Todo.findByIdAndRemove(todoId)
            .then((deletedTodo) => {
                if(deletedTodo) {
                    return res.status(200).send(deletedTodo);
                }
                else {
                    return res.status(404).send({
                        "type": "error_response",
                        "message": "todo not found"
                    });
                }
            })
            .catch((ex) => {
                console.log("Unexpected while removing todo", ex);

                return res.status(400).send({
                    "type": "error_response",
                    "message": "Error while removing todo"
                });
            });
    }
    else {
        return res.status(400).send({
            "type": "error_response",
            "message": "invalid todo ID"
        });
    }
});

app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});

module.exports = {
    app: app
};