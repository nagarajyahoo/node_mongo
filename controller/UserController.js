const _ = require('lodash');

var {User} = require('../mongoose_module/model/User.js');
var {mongoose} = require('../mongoose_module/mongoose/MongooseDB.js');
var {ObjectID} = require('mongodb');
var {app} = require('../server');
var {errorResponse} = require('../server');

app.post('/users', (req, res) => {
    var userDetails = _.pick(req.body, ['email', 'password']);
    return res.status(200).send(userDetails);
});