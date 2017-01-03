const express = require('express');
const router = express.Router();
const tournaments = require('../models/tournaments.js');

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
  tournaments.create(req.body).then(tournament => {
    res.status(201).send(tournament);
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
