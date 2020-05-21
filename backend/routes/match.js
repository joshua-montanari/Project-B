const router = require('express').Router();
let Match = require('../models/match.model');

router.route('/').get((req, res) => {
    Match.find()
        .then(match => res.json(match))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const winnerID = req.body.winnerID;
    const loserID = req.body.loserID;
    const matchScore = req.body.matchScore;
    const date = Date.parse(req.body.date);

    const newMatch = new Match({
        winnerID,
        loserID,
        matchScore,
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
            match.loserID = req.body.loserID;
            match.matchScore = req.body.matchScore;
            match.date = Date.parse(req.body.date);

            match.save()
                .then ( () => res.json('Match updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;