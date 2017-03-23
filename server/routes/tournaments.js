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


// NOTE: This is probably not the most RESTful of an api, but is currently the best way I can think of to handle the minimal denormalization required for the Tournaments Progress Bar on the home page.
router.post('/', (req, res) => {
  // If there is no name send an error message.
  if (!req.body.name) {
    return res.status(400).send({message: 'Tournaments must have a name!'});
  }

  // Here we pull the necessary stuff from the request body
  let { added, rounds = 1, name } = req.body;

  // Create the tournament with the name.
  tournaments.create({name}).then(tournament => {

    // use the added <Array>, the rounds, and the tournament id to create the new games
    let newGames = _.createGames(added.map(Number), tournament[0].id, rounds);

    // save them in the database
    games.create(newGames).then(games => {

      // Once they are in the database we need to add the total game count to the tournament.
      let totalGames = games.length - 1;

      let { id } = tournament[0];
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
