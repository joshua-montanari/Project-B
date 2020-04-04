const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    username1: {type: String, required: true},
    username2: {type: String, required: true},
    user1GameCount: {type: Number, required: true},
    user2GameCount: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;