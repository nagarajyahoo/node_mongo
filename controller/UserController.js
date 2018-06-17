const _ = require('lodash');

var {User} = require('../mongoose_module/model/User.js');
var {mongoose} = require('../mongoose_module/mongoose/MongooseDB.js');
var {ObjectID} = require('mongodb');
var {app} = require('../server');

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

var authenticate = (req, res, next) => {
    try {
        var token = req.header('x-auth');

            User.getUser(token)
                .then((user) => {
                    if(user) {
                        req.user = user;
                        req.token = token;
                        next();
                    }
                    else {
                        return Promise.reject('user not found');
                    }
                })
                .catch((ex) => {
                    console.error("error occurred", ex);
                    return res.status(401).send({
                        "type": "error_response",
                        "message": "un-authenticated"
                    });
                });
    }
    catch (ex) {
        console.error("error occurred", ex);
        return res.status(401).send({
            "type": "error_response",
            "message": "un-authenticated"
        });
    }
};

app.get('/users/me', authenticate, (req, res) => {
    return res.status(200).send(req.user);
});