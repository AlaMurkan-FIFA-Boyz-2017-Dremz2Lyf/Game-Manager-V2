require(TEST_HELPER);

let games = mockData.games.map(game => {
  return {p1: game.p1, p2: game.p2, tournamentId: game.tournamentId};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('games').insert(games)
  );
};
