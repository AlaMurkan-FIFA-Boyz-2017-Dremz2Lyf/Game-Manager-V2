require(TEST_HELPER);

let tourneyNames = mockData.tournaments.map(tourney => {
  return {name: tourney.name, gamesPlayed: tourney.gamesPlayed, totalGames: tourney.totalGames, createdAt: TestHelper.createdAt, updatedAt: TestHelper.updatedAt};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('tournaments').insert(tourneyNames)
  );
};
