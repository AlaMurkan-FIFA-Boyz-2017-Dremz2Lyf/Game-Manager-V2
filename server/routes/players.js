const express = require('express');
const router = express.Router();
const players = require('../models/players.js');
const _ = require('../utilities.js');

router.get('/', (req, res) => {
  if (req.query.id) {
    players.find(req.query.id).then(player => {
      res.send([player]);
    }).catch(err => {
      res.send(404);
    });
  } else {
    players.all().then(players => {
      res.send(players);
    }).catch(err => {
      res.send(404);
    });
  }
});

router.post('/', (req, res) => {
  req.body.username = _.formatName(req.body.username);
  players.create(req.body).then(player => {
    res.status(201).send(player);
  }).catch(err => {
    res.status(409).send(err);
  });
});


router.put('/', (req, res) => {
  // Build an array of the queries based on the request body, players key <Array>
  let queries = req.body.players.map(player => players.updateOne(player) );
  // Wait for all those queries to finish
  Promise.all(queries).then(players => {
    // updateOne returns an array of a player object
    let combined = players[0].concat(players[1]);
    res.status(202).send(combined);
  }).catch(err => {
    res.status(400).send(err);
  });

});

// NOTE: Delete is a problem, PSQL has some restrictions that we need to work through with foreign keys.
// router.delete('/', (req, res) => {
//   if (req.query.id) {
//     players.delete(req.query.id).then(res => {
//       res.send(200);
//     });
//   }
// });

module.exports = router;
