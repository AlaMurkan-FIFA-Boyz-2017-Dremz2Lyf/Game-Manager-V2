const express = require('express');
const router = express.Router();
const path = require('path');

const assets = process.env.NODE_ENV === 'production' ? 'public' : 'devStatics';

router.get('*', (req, res) => {
  res.sendFile(path.resolve(assets, 'index.html'));
});

module.exports = router;
