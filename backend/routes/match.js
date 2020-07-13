const router = require('express').Router();
let Match = require('../models/match.model');

router.route('/').get((req, res) => {
    Match.find()
        .then(match => res.json(match))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const winnerID = req.body.winnerID;
    const winnerName = req.body.winnerName;
    const winnerScore = req.body.winnerScore
    const loserID = req.body.loserID;
    const loserName = req.body.loserName;
    const loserScore = req.body.loserScore
    const date = Date.parse(req.body.date);

    //register match validation
    if(!loserUsername || !loserID || !loserScore || !winnerScore || !date)
        return res.status(400).json({msg: 'not all fields have been entered'})
    if(!winnerID || !winnerName)
        return res.status(400).json({msg: 'error getting logged in user'})
    if(loserScore > winnerScore)
        return res.status(400).json({msg: 'Logged in user must be the winner'})
    if(loserScore === winnerScore)
        return res.status(400).json({msg: 'there cannot be a tie'})
    const newMatch = new Match({
        winnerID,
        winnerName,
        winnerScore,
        loserID,
        loserName,
        loserScore, 
        date,
    });

        newMatch.save()
        .then(() => res.json('Match added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Match.findById(req.params.id)
        .then(match => res.json(match))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Match.findByIdAndDelete(req.params.id)
        .then( () => res.json('Match deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Match.findById(req.params.id)
        .then(match => {
            match.winnerID = req.body.winnerID;
            match.winnerName = req.body.winnerName;
            match.winnerScore = req.body.winnerScore;
            match.loserID = req.body.loserID;
            match.loserName = req.body.loserName;
            match.loserScore = req.body.loserScore;            match.matchScore = req.body.matchScore;
            match.date = Date.parse(req.body.date);

            match.save()
                .then ( () => res.json('Match updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;