require(TEST_HELPER);

let games = mockData.games.map(game => {
  let out = Object.assign({}, game, {createdAt: TestHelper.createdAt});
  delete out.id;
  return out;
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('games').insert(games)
  );
};
