var {User} = require('./../mongoose_module/model/User');

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
                return res.status(401).send({
                    "type": "error_response",
                    "message": "un-authenticated"
                });
            });
    }
    catch (ex) {
        return res.status(401).send({
            "type": "error_response",
            "message": "un-authenticated"
        });
    }
};

module.exports = {
    authenticate : authenticate
};