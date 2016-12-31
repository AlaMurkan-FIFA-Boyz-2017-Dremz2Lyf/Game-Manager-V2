const express = require('express');
const router = express.Router();
const _ = require('../utilities.js');
const games = require('../models/games');

// NOTE: All this ' is a placeholder for a database.

let gameTable = [
  {id: 1, p1: 1, p2: 2, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48'},
  {id: 2, p1: 1, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48'},
  {id: 3, p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48'}
];

/*********************************************/

router.name = 'games';

router.get('/', (req, res) => {
  games.all().then(rows => {
    console.log('games rows:', rows);
  });
  // Sending fake data until the database is up.
  if (req.query.type === 'game') {
    res.send([gameTable[req.query.id - 1]]);
  } else if (req.query.type === 'tournament') {
    let response = gameTable.filter(game => game.tournamentId === req.query.id);
    res.send(response);
  } else {
    res.send(gameTable);
  }

});

router.post('/', (req, res) => {

  let players = req.body.players;
  let tournamentId = req.body.tournamentId;

  let response = {
    gamesCreated: 0
  };

  // placeholders for the 'interaction with the Database'
  // ********************************
  if (players.length < 3) {
    let game = _.createGame(players[0], players[1]);

    game.id = gameTable.length;

    response.gamesCreated = 1;

    gameTable.push(game);
  } else {
    let newGames = _.createGames(players, tournamentId);

    gameTable = gameTable.concat(newGames);

    gameTable.forEach((game, index) => {
      game.id = game.id || index + 1;
    });

    response.gamesCreated = gameTable.length;
  }
// **********************************
  res.status(201).send(response);
});

router.put('/', (req, res) => {

  let index = req.body.id - 1;

  gameTable[index] = req.body;

  let response = {id: req.body.id};
  res.status(202).send(response);
});

module.exports = router;
