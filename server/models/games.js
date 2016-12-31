const model = require('./lib/knex_model');

let games = module.exports = model.create('games', {
  tableName: 'games'
});
