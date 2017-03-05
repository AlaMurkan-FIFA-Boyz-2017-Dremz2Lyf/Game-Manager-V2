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
  // Check if there was no body posted send an error message if so.
  if (!req.body) {
    res.status(400).send({message: 'Whoops! Did you forget to include any info?'});
  }

  // Here we pull the necessary stuff from the request body
  let { added, rounds = 1, name } = req.body;

  tournaments.create({name}).then(tournament => (
    tournament
  )).then(tournament => {

    let newGames = _.createGames(added.map(Number), tournament.id, rounds);
    games.create(newGames).then(games => {
      let totalGames = Object.keys(games).length - 1;
      let { id } = tournament;
      tournaments.save({id, totalGames}).then(tournament => {
        res.status(201).send(tournament);
      }).catch(err => {
        // Catch for saving tournament with totalGames count
        res.status(500).send(err);
      });
    }).catch(err => {
      // Catch for creating the games in the db with the tournament id
      res.status(500).send(err);
    });
  }).catch(err => {
    // Catch for creating the tournament with just the name
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
