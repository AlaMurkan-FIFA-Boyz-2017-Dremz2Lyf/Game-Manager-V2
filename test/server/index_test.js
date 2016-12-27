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

      it('should error if the arguments are not numbers', () => {
        expect(_.createGame.bind(this, {}, 4)).to.throw(TypeError, /createGame accepts two numbers/);
      });

      it('should return a game object when called with two playerIds', () => {
        let newGame = _.createGame(1, 2);

        expect(newGame).to.have.all.keys('p1', 'p2', 'createdAt');
        expect(newGame.p1).to.be.a('number');
      });
    });

    describe('createGames', () => {

      it('should be a function', () => {
        expect(_.createGames).to.be.a('function');
      });

      it('should error if the first argument is not an array', () => {
        expect(_.createGames.bind(this, {invalid: 'invalid'}, 8)).to.throw(TypeError, /must be an array/);
      });

      it('should error if the second argument is not a number', () => {
        expect(_.createGames.bind(this, [1, 2, 3], '4')).to.throw(TypeError, /must be a number/);
      });

      it('should return an array of game objects to be inserted into the database', () => {
        let newGames = _.createGames([1, 2, 3, 4], 2);

        expect(newGames).to.be.a('array');
        expect(newGames[0]).to.be.a('object');
        expect(newGames[0]).to.have.any.keys('p1', 'p2', 'tournamentId', 'createdAt');
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

        it_('should respond with all the games when no id or type param is passed', function * () {

          yield request(app)
          .get('/games')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
            expect(res.body[0]).to.have.any.keys('p1', 'p2', 'tournamentId');
            expect(res.body[0]).to.deep.equal(mockData.games[0]);
          });
        });

        it_('should return a single game when an id and type param of game is passed', function * () {

          yield request(app)
          .get('/games?id=1&type=game')
          .expect(res => {
            expect(res.body.length).to.equal(1);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
            expect(res.body[0]).to.have.any.keys('id', 'p1', 'p2', 'p1Score', 'p2Score');
          });
        });

      });

      describe('POST', () => {
        let singleGame = {
          players: [1, 2]
        };
        let tournament = {
          players: [1, 2, 3],
          tournamentId: 4
        };

        it_('should receive an array of player Ids and respond with the number of games after posting them in the database', function * () {

          let newTourney = _.createGames(tournament.players, tournament.tournamentId);

          let lastId = mockData.games.length;

          newTourney.forEach(game => {
            game.id = ++lastId;
          });

          let gamesCopy = mockData.games.concat(newTourney);

          yield request(app)
          .post('/games')
          .send(tournament)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.all.keys('gamesCreated');
          })
          .then(res => {
            return request(app)
            .get('/games')
            .expect(res => {
              expect(res.body).to.deep.equal(gamesCopy);
            });
          });
        });

        // it_('should call createGame if there is no tournamentId in the request body', function * () {
        //
        //   yield request(app)
        //   .post('/games')
        //   .send(singleGame)
        //   .expect('this is totally going to fail until').to.equal('I can get sinon set up to spy this function')
        //   .expect(res => {
        //     expect(res.status).to.equal(201);
        //   });
        // });
        //
        // it_('should call createGames if there is a tournamentId in the request body', function * () {
        //   expect('this is totally going to fail until').to.equal('I can get sinon set up to spy this function');
        // });

      });

      // describe('PUT', () => {
      //
      //   it_('should respond with a status of 202', function * () {
      //     let finishedGame = mockData.games[2];
      //
      //     yield request(app)
      //     .put('/games')
      //     .expect(202);
      //   });
      // });

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
