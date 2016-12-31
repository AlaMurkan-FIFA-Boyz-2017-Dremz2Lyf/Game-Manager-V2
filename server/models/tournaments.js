const model = require('./lib/knex_model');

let tournaments = module.exports = model.create('tournaments', {
  tableName: 'tournaments'
});
