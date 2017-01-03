const express = require('express');
const router = express.Router();
const _ = require('../utilities.js');
const games = require('../models/games');

router.name = 'games';

/*
  The GET route for games accepts a few params/queries to determine what is sent as the response
    - 'id': A number to be used as either the game id or the tournament id for fetching games. <Number>
    - 'type': either 'game', or 'tournament'. Determines how to use the id passed <String>
*/
router.get('/', (req, res) => {

  if (req.query.type === 'game') {
    let gameId = req.query.id;

    games.find(gameId).then(game => {
      res.send(game);
    }).catch(err => {
      res.status(500).send('Something went wrong fetching the game by id', err);
    });
  } else if (req.query.type === 'tournament') {
    let id = req.query.id;

    games.findBy({tournament: id}).then(games => {
      res.send(games);
    }).catch(err => {
      res.status(500).send('Something went wrong fetching the games by tournament id', err);
    });
  } else {
    games.all().then(games => {
      res.send(games);
    }).catch(err => {
      res.status(500).send(err);
    });
  }
});

router.post('/', (req, res) => {

  let players = req.body.players;
  let tournament = req.body.tournament;

  if (players.length > 2) {
    let newGames = _.createGames(players, tournament);

    games.create(newGames).then(savedGames => {
      res.status(201).send(savedGames);
    }).catch(err => {
      res.status(500).send('Error in saving the games to database', err);
    });
  } else {
    res.status(400).send('Games must have at least two players');
  }
});

router.put('/', (req, res) => {

  let game = req.body;

  games.updateOne(game).then(updatedGame => {
    res.status(202).send(updatedGame);
  }).catch(err => {
    res.status(500).send('Error in updateding the game in the database', err);
  });
});

module.exports = router;
