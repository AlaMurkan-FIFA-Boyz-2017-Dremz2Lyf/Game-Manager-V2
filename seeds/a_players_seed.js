require(TEST_HELPER);

let playerNames = mockData.players.slice().map(player => {
  return {username: player.username, createdAt: TestHelper.createdAt};
} );

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('players').insert(playerNames)
  );
};
