const express = require('express');
const router = express.Router();
const tournaments = require('../models/tournaments');
const games = require('../models/games');
const _ = require('../utilities');

router.get('/', (req, res) => {
  if (req.query.id) {
    tournaments.find(req.query.id).then(tournament => {
      res.send(tournament);
    }).catch(err => {
      res.status(404).send(err);
    });
  } else {
    tournaments.all().then(tournaments => {
      res.send(tournaments);
    }).catch(err => {
      res.status(404).send(err);
    });
  }
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).send({message: 'Tournaments must have a name!'});
  }
  let { added, rounds = 1, name } = req.body;
  tournaments.create({name}).then(tournament => (
    tournament
  )).then(tournament => {

    let newGames = _.createGames(Object.keys(added).map(Number), tournament.id, rounds);
    games.create(newGames).then(games => {
      res.status(201).send(tournament);
    }).catch(err => {
      res.status(500).send(err);
    });
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.put('/', (req, res) => {
  let tournament = req.body;

  tournaments.updateOne(tournament).then(updatedTournament => {
    res.status(202).send(updatedTournament);
  }).catch(err => {
    if (err.type === 'invalid_argument') {
      res.status(400).send(err.type);
    } else {
      res.status(500).send(err);
    }
  });

});

module.exports = router;
