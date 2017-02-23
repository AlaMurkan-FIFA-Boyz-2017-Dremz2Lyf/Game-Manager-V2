
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tournaments', function(table) {
      table.integer('gamesPlayed').unsigned();
      table.integer('totalGames').unsigned();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tournaments', function(table) {
      table.dropColumn('gamesPlayed');
      table.dropColumn('totalGames');
    })
  ]);
};
