const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('../utilities');

const assets = _.envStaticPath(process.env.NODE_ENV);

router.get('*', (req, res) => {
  res.sendFile(path.resolve(assets, 'index.html'));
});

module.exports = router;
