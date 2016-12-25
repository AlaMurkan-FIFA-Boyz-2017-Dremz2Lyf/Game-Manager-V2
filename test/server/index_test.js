require(TEST_HELPER); // <--- This must be at the top of every test file.
const helpers = require(__server + '/utilities.js');
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');


// NOTE: This will be used after knex is configured and the database is set up
// const config = require('../../knexfile.js');

describe('The Server', function() {

  // const knex = require('knex')(config[env]);

  let app = TestHelper.createApp();

  app.use('/', routes);

  app.testReady();


  describe('Utilities', function() {
    it('should be importable', () => {
      expect(_).to.be.an('object');
    });

    describe('createGame', () => {

      it('should be a function', () => {
        expect(_.createGame).to.be.a('function');
      });

      it('should error if the first argument is not an array with length of 2', () => {
        expect(_.createGame.bind(this, {fail: 'data'}, 4)).to.throw(TypeError, /must be an Array with two playerIds/);
      });
    });

  });

  describe('Routes', function() {

    // beforeEach(function(done) {
    //   knex.migrate.rollback().then(res => {
    //     knex.migrate.latest().then(res => {
    //       return knex.seed.run().then(res => {
    //         done();
    //       });
    //     });
    //   });
    // });
    describe('root', () => {
      it_('should serve the static files on calls to the route', function * () {

        yield request(app)
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.text).to.be.an('string');
          expect(TestHelper.checkForHtml(res.text)).to.equal('<html>');
        });
      });
    });

    describe('/games', function() {

      describe('GET', () => {

        it_('should respond with an Array of game objects', function * () {

          yield request(app)
          .get('/games')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
            expect(res.body[0]).to.have.any.keys('p1', 'p2', 'tournamentId');
          });
        });
      });

      describe('POST', () => {

        it_('should respond with; tournamentId, the number of games, and date created', function * () {
          let newGames =


          yield request(app)
          .post('/games')
          .send()
          .expect((res) => {
            expect(res.status).to.equal(201);
            expect(res.createdAt).to.be.a.string;
            expect(res.body).to.have.all.keys('tournamentId', 'gamesCreated');
          });
        });
      });

      describe('PUT', () => {

        it_('should respond with a status of 202', function * () {

          yield request(app)
          .put('/games')
          .expect(202);
        });
      });

    });
  //
  //   describe('/tournaments', function() {
  //     describe('GET', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .get('/tournaments')
  //         .expect(200);
  //       });
  //     });
  //
  //     describe('POST', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .post('/tournaments')
  //         .expect(201);
  //       });
  //     });
  //
  //     describe('PUT', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .put('/tournaments')
  //         .expect(202);
  //       });
  //     });
  //
  //   });
  //
  //   describe('/players', function() {
  //     describe('GET', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .get('/players')
  //         .expect(200);
  //       });
  //     });
  //
  //     describe('POST', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .post('/players')
  //         .expect(201);
  //       });
  //     });
  //
  //     describe('PUT', () => {
  //
  //       it_('should respond with a status of 200', function * () {
  //
  //         yield request(app)
  //         .put('/players')
  //         .expect(202);
  //       });
  //     });
  //
  //   });
  });

});
