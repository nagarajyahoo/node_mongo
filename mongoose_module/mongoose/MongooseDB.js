const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const con = mongoose.connect(process.env.MONGODB_URI);

module.exports  = {
    mongoose : mongoose
};
