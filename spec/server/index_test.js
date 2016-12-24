require(TEST_HELPER); // <--- This must be at the top of every test file.

var helpers = require(__server + '/serverHelpers.js');
var request = require('supertest-as-promised');
var routes = require(__server + '/index.js');
var config = require('../../knexfile.js');
var env = 'test';


describe('The Server', function() {

  var knex = require('knex')(config[env]);

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();
  // Notice how these are generator functions (indicated by the the *)
  // See test/test-helper.js for details of why this works.
  // I (Scott) have no clue, but it seems to be working right now.......

  describe('Helper functions', function() {

  });

  describe('Routes', function() {

    beforeEach(function(done) {
      knex.migrate.rollback().then(res => {
        knex.migrate.latest().then(res => {
          return knex.seed.run().then(res => {
            done();
          });
        });
      });
    });

    describe('/api/games', function() {

      it_('Should be a route in the server', function * () {
        console.log('NOTE: The get all games route will be made when we want to make a player stats page');
        yield request(app)
        .get('/api/games')
        .expect(200);
      });

      it_('Should respond with an array of objects when queried with a tournament_id', function * () {

        yield request(app)
        .get('/api/games?tournament_id=1')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
        });
      });

    });

    describe('/api/games/table', function() {

      it_('Should be a route in the server', function * () {

        yield request(app)
        .get('/api/games/table')
        .expect(200);
      });

      it_('Should respond with an array of objects when queried with a tournament_id', function * () {

        yield request(app)
        .get('/api/games/table?tournament_id=1')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
        });
      });

      it_('The objects in the return array should be properly formatted', function * () {

        yield request(app)
        .get('/api/games/table')
        .expect(200)
        .expect(function(response) {
          expect(response.body[0]).to.have.all.keys('playerId', 'gp', 'won', 'loss', 'draw', 'gd', 'points');
        });
      });

    });
  });



});
