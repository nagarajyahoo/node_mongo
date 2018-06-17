const _ = require('lodash');

var {User} = require('../mongoose_module/model/User.js');
var {mongoose} = require('../mongoose_module/mongoose/MongooseDB.js');
var {ObjectID} = require('mongodb');
var {app} = require('../server');
var {authenticate} = require('../security/Authenticate');

app.post('/users', (req, res) => {
    var userDetails = _.pick(req.body, ['email', 'password']);
    var user = new User(userDetails);

    user.save()
        .then((savedUser) => {
            return savedUser.generateAuth();
        })
        .then((token) => {
            return res.header('x-auth', token).status(200).send(user);
        })
        .catch((ex) => {
            return res.status(500).send({
                "type": "error_response",
                "message": ex.message
            });
        });
});

app.get('/users/me', authenticate, (req, res) => {
    return res.status(200).send(req.user);
});