const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchSchema = new Schema({
    winnerID: {type: String, required: true},
    winnerName: {type: String, required: true},
    winnerScore: {type: Number, required: true},
    loserID: {type: String, required: true},
    loserName: {type: String, required: true},
    loserScore: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;