const mongoose = require('mongoose');

var schema = {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
};

var user = mongoose.model('User', schema);

module.exports = {
    User: user
};