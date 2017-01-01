
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('createdAt').unsigned();
      table.string('updatedAt').unsigned();
    }),
    knex.schema.createTable('tournaments', function(table) {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('winner').references('id').inTable('players');
      table.string('createdAt').unsigned();
      table.string('updatedAt').unsigned();
    }),
    knex.schema.createTable('games', function(table) {
      table.increments('id').primary();
      table.integer('p1').references('id').inTable('players');
      table.integer('p2').references('id').inTable('players');
      table.integer('p1Score').unsigned();
      table.integer('p2Score').unsigned();
      table.integer('p1Shots').unsigned();
      table.integer('p2Shots').unsigned();
      table.integer('p1Poss').unsigned();
      table.integer('p2Poss').unsigned();
      table.integer('p1OnGoal').unsigned();
      table.integer('p2OnGoal').unsigned();
      table.integer('tournament').references('id').inTable('tournaments');
      table.string('status').defaultTo('created');
      table.string('createdAt').unsigned();
      table.string('updatedAt').unsigned();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE players CASCADE'),
    knex.raw('DROP TABLE tournaments CASCADE'),
    knex.raw('DROP TABLE games CASCADE')
  ]);
};
