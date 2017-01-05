var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

if (process.env.NODE_ENV !== 'test') {
  knex.migrate.latest([config]);
}
