const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

schema.methods.generateAuth = function () {
    var user = this;
    var access = 'auth';
    const token = jwt.sign({"_id": user._id.toHexString(), "access": access}, 'secret123').toString();
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