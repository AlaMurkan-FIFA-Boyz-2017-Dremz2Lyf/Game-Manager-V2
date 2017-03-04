var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

if (process.env.NODE_ENV !== 'test') {
  knex.migrate.latest([config]);
}
