const express = require('express');
const router = express.Router();
const _ = require('../utilities');
const table = require('../models/table.js');

router.get('/', (req, res) => {
  table.getTable().then(({players, games}) => {
    let built = _.createTable(players, games);

    res.status(200).send(built);
  });
});

module.exports = router;
