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
      res.send([game]);
    }).catch(err => {
      res.status(500).send('Something went wrong fetching the game by id', err);
    });
  } else if (req.query.type === 'tournament') {
    let tournamentId = req.query.id;

    games.findBy({tournament: tournamentId}).then(games => {
      res.send(games);
    }).catch(err => {
      res.status(500).send('Something went wrong fetching the games by tournament id', err);
    });
    res.send(response);
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

  if (players.length === 2) {
    let newGame = _.createGame(players[0], players[1]);

    games.create(newGame).then(savedGame => {
      res.status(201).send([savedGame]);
    }).catch(err => {
      res.status(500).send('Error in saving game to database', err);
    });
  } else if (players.length > 2) {
    let newGames = _.createGames(players, tournament);

    games.create(newGames).then(savedGames => {
      res.status(201).send(savedGames);
    }).catch(err => {
      res.status(500).send('Error in saving the games to database', err);
    });
  }
//     let newGames = _.createGames(players, tournament);
//
//     gameTable = gameTable.concat(newGames);
//
//     gameTable.forEach((game, index) => {
//       game.id = game.id || index + 1;
//     });
//
//     response.gamesCreated = gameTable.length;
//   }
// // **********************************


  // res.status(201).send(response);
});

router.put('/', (req, res) => {
  //
  // let index = req.body.id - 1;
  //
  // gameTable[index] = req.body;
  //
  // let response = {id: req.body.id};
  // res.status(202).send(response);
});

module.exports = router;
