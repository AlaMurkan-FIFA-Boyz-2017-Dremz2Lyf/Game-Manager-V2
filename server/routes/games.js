const express = require('express');
const router = express.Router();

// NOTE: This and all 'mockData' is a placeholder for a database.
require(TEST_HELPER);
/*********************************************/

router.name = 'games';

router.post('/', (req, res, next) => {
  let today = new Date();

  req.createdAt = today.toISOString();

  next();
});

router.get('/', (req, res) => {
  res.send(mockData.games);
});

router.post('/', (req, res) => {
  let count = req.games ? req.games.length : 0;

  let response = {
    tournamentId: '6',
    gamesCreated: count
  };

  res.status(201).send(response);
});

router.put('/', (req, res) => {

});

module.exports = router;
