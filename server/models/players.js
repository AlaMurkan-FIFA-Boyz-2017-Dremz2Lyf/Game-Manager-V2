const model = require('./lib/knex_model');

let players = module.exports = model.create('players', {
  tableName: 'players'
});
