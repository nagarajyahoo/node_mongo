require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

var errorResponse = {
    "type": "error_response"
};

app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});

module.exports = {
    app : app,
    errorResponse : errorResponse
};

require('./controller/TodoController');
require('./controller/UserController');

