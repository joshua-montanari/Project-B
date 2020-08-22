const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    username: {type: String},
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);

module.exports = User;