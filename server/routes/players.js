const express = require('express');
const router = express.Router();
const players = require('../models/players.js');

router.get('/', (req, res) => {
  if (req.query.id) {
    players.find(req.query.id).then(player => {
      res.send(player);
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
  players.create(req.body).then(player => {
    res.status(201).send(player);
  }).catch(err => {
    res.status(404).send(err);
  });
});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;
