
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.integer('wins').defaultTo(0);
      table.integer('losses').defaultTo(0);
      table.integer('draws').defaultTo(0);
      table.integer('goalsFor').defaultTo(0);
      table.integer('goalsAgainst').defaultTo(0);
      table.integer('shots').defaultTo(0);
      table.integer('onGoal').defaultTo(0);
      table.integer('reds').defaultTo(0);
      table.integer('yellows').defaultTo(0);
      table.boolean('isTeam').defaultTo(false);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('tournaments', function(table) {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.integer('winner').references('id').inTable('players');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
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
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
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
