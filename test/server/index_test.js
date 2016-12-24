require(TEST_HELPER); // <--- This must be at the top of every test file.
const helpers = require(__server + '/utilities.js');
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');


// NOTE: This will be used after knex is configured and the database is set up
// const config = require('../../knexfile.js');

describe('The Server', function() {

  // const knex = require('knex')(config[env]);

  let app = TestHelper.createApp();

  app.use('/', routes);
  app.testReady();


  describe('Utilities', function() {

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
      it_('Should serve the static files on calls to the route', function * () {

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

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .get('/games')
          .expect(200);
        });
      });

      describe('POST', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .post('/games')
          .expect(201);
        });
      });

      describe('PUT', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .put('/games')
          .expect(202);
        });
      });

    });

    describe('/tournaments', function() {
      describe('GET', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .get('/tournaments')
          .expect(200);
        });
      });

      describe('POST', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .post('/tournaments')
          .expect(201);
        });
      });

      describe('PUT', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .put('/tournaments')
          .expect(202);
        });
      });

    });

    describe('/players', function() {
      describe('GET', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .get('/players')
          .expect(200);
        });
      });

      describe('POST', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .post('/players')
          .expect(201);
        });
      });

      describe('PUT', () => {

        it_('should respond with a status of 200', function * () {

          yield request(app)
          .put('/players')
          .expect(202);
        });
      });

    });
  });



});
