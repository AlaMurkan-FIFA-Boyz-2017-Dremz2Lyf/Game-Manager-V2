const express = require('express');
const router = express.Router();

router.name = 'games';

router.get('/', (req, res) => {
  res.send('okay');
});

router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

module.exports = router;
