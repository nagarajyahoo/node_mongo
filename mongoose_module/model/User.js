const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const SECRET = "secret123";

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

schema.statics.getUser = function (token) {
    var User = this;
    try {
        const decoded = jwt.decode(token, SECRET);
        return User.findOne({
            '_id' : decoded._id,
            'tokens.token' : token,
            'tokens.access' : 'auth',
        });
    }
    catch (ex) {
        return Promise.reject(ex);
    }
};

schema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

schema.methods.generateAuth = function () {
    var user = this;
    var access = 'auth';
    const token = jwt.sign({"_id": user._id.toHexString(), "access": access}, SECRET).toString();
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save()
        .then(() => {
            return token;
        });
};

var user = mongoose.model('User', schema);

module.exports = {
    User: user
};