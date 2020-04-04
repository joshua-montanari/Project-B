const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
        .then(games => res.json(games))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username1 = req.body.username1;
    const username2 = req.body.username2;
    const user1GameCount = Number(req.body.user1GameCount);
    const user2GameCount = Number(req.body.user2GameCount);
    const date = Date.parse(req.body.date);

    const newGame = new Game({
        username1,
        username2,
        user1GameCount,
        user2GameCount,
        date,
    });

        newGame.save()
        .then(() => res.json('Game added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then( () => res.json('Game deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
        .then(game => {
            game.username1 = req.body.username1;
            game.username2 = req.body.username2;
            game.user1GameCount = Number(req.body.user1GameCount);
            game.user2GameCount = Number(req.body.user2GameCount);
            game.date = Date.parse(req.body.date);

            game.save()
                .then ( () => res.json('Game updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;