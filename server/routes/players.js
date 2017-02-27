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


// NOTE: These Methods will be implimented as needed, and as a solution to the delete problem is found.
// router.put('/', (req, res) => {
//
// });
//
// router.delete('/', (req, res) => {
//   if (req.query.id) {
//     players.delete(req.query.id).then(res => {
//       res.send(200);
//     });
//   }
// });

module.exports = router;
