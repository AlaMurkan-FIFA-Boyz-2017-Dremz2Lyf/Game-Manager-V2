const model = require('./lib/knex_model');

let tournaments = model.create('tournaments', {
  tableName: 'tournaments'
});

module.exports = tournaments;
