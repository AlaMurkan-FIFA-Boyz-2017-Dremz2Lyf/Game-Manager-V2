require(TEST_HELPER);

let tourneyNames = mockData.tournaments.map(tourney => {
  return {name: tourney.name, createdAt: TestHelper.createdAt};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('tournaments').insert(tourneyNames)
  );
};
