const express = require('express');
const router = express.Router();
const _ = require('../utilities.js');

// NOTE: All this 'mockData' is a placeholder for a database.
let mockData = {};

mockData.games = [
  {p1: 1, p2: 2, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48.241Z'},
  {p1: 1, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48.241Z'},
  {p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created', createdAt: '2016-12-25T19:31:48.241Z'}
];

/*********************************************/

router.name = 'games';

router.get('/', (req, res) => {
  // Sending fake data until the database is up.
  res.send(mockData.games);
});

router.post('/', (req, res) => {
  let players = req.body.players;
  let tournamentId = req.body.tournamentId;

  let response = {
    gamesCreated: 0
  };

  if (players.length < 3) {
    let game = _.createGame(players[0], players[1]);

    response.gamesCreated = 1;

    mockData.games.push(game);
  } else {
    let games = _.createGames(players, tournamentId);

    mockData.games = mockData.games.concat(games);

    response.gamesCreated = games.length;
  }

  res.status(201).send(response);
});

router.put('/', (req, res) => {

});

module.exports = router;
