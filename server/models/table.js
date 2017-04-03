const db = require('../db');
const _ = require('../utilities');

exports.getTable = () => (
  Promise.all([
    db('players').select('*'),
    db('games').select('*').where('status', 'finished')
  ]).then((res) => ({players: res[0], games: res[1]}))
);
