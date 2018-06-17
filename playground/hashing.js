const {SHA256} = require('crypto-js');

var message = "hello";
var hash = SHA256("hello").toString();

console.log(`${message} hashed as ${hash}`);