require(TEST_HELPER); // <--- This must be at the top of every test file.
const helpers = require(__server + '/utilities.js');
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('The Server', function() {

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
        expect(newGames[0]).to.have.any.keys('p1', 'p2', 'tournament', 'createdAt');
      });
    });

  });

  describe('Base root "/"', () => {
    it_('should serve the static files on calls to the root', function * () {

      yield request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.be.an('string');
        expect(TestHelper.checkForHtml(res.text)).to.equal('<html>');
      });
    });
  });

  describe('Routes', function() {

    beforeEach(function(done) {
      db.migrate.rollback().then(res => {
        db.migrate.latest().then(res => {
          return db.seed.run().then(res => {
            done();
          });
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
            expect(res.body[0]).to.have.any.keys('p1', 'p2', 'tournament');
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
          tournament: 4
        };

        it_('should receive an array of player Ids and respond with the number of games after posting them in the database', function * () {

          let newTourney = _.createGames(tournament.players, tournament.tournament);

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

        it_('should call createGame if there is no tournament in the request body', function * () {
          let createGame = sinon.spy(_, 'createGame');
          let createGames = sinon.spy(_, 'createGames');

          yield request(app)
          .post('/games')
          .send(singleGame)
          .expect(res => {
            expect(_.createGame.callCount).to.equal(1);
            expect(_.createGames.callCount).to.equal(0);
            expect(res.status).to.equal(201);
          });

          createGame.restore();
          createGames.restore();
        });

        it_('should call createGames if there is a tournament in the request body', function * () {
          let createGame = sinon.spy(_, 'createGame');
          let createGames = sinon.spy(_, 'createGames');

          yield request(app)
          .post('/games')
          .send(tournament)
          .expect(res => {
            expect(_.createGame.callCount).to.equal(3);
            expect(_.createGames.callCount).to.equal(1);
            expect(res.status).to.equal(201);
          });

          createGame.restore();
          createGames.restore();
        });

      });

      describe('PUT', () => {

        it_('should respond with a status of 202, and the id of the updated game', function * () {
          let finishedGame = Object.assign({}, mockData.games[2]);
          finishedGame.p1Score = 3;
          finishedGame.p2Score = 2;

          yield request(app)
          .put('/games')
          .send(finishedGame)
          .expect(202)
          .expect(res => {
            expect(res.accepted).to.equal(true);
            expect(res.body.id).to.equal(finishedGame.id);
          })
          .then(res =>
            request(app)
            .get('/games')
            .expect(200)
            .expect(res => {
              expect(res.body[2]).to.deep.equal(finishedGame);
            })
          );
        });
      });

    });

    describe('/tournaments', function() {
      describe('GET', () => {

        it_('should respond with all the tournaments when no id is passed as a param', function * () {

          yield request(app)
          .get('/tournaments')
          .expect(200)
          .expect(res => {
            expect(res.body.length).to.equal(5);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
          });
        });

        it_('should return the correct tournament when an id is passed', function * () {

          yield request(app)
          .get('/tournaments?id=2')
          .expect(200)
          .expect(res => {
            expect(res.body.length).to.equal(1);
            expect(res.body[0].name).to.equal('new');
          });
        });
      });

      describe('POST', () => {

        it_('should respond with a status of 201', function * () {

          yield request(app)
          .post('/tournaments')
          .send({name: 'ultraTourney!'})
          .expect(201)
          .expect(res => {
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.all.keys('id', 'name', 'createdAt');
            expect(res.body.name).to.equal('ultraTourney!');
          });
        });

        it('should 400 when no tournament name is present', function * () {

          yield request(app)
          .post('/tournaments')
          .send({user: ''})
          .expect(400)
          .expect(res => {
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Tournaments must have a name!');
          });
        });

      });
      //
      describe('PUT', () => {

        it_('should accept an updated tournament. Respond with 202 and the updated properties', function * () {
          let updatedTournament = mockData.tournaments.slice(2, 3)[0];
          updatedTournament.winner = 2;

          yield request(app)
          .put('/tournaments')
          .send(updatedTournament)
          .expect(202)
          .expect(res => {
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.equal(3);
            expect(res.body.name).to.equal('next');
          });
        });

        it_('should error if there is no "id" given for the update', function * () {
          let noId = mockData.tournaments.slice(2, 3)[0];
          delete noId.id;

          yield request(app)
          .put('/tournaments')
          .send(noId)
          .expect(400)
          .expect(res => {
            expect(res.error.text).to.equal('invalid_argument');
          });
        });
      });

    });

    describe('/players', function() {
      describe('GET', () => {

        it_('should respond with a status of 200, and all players when no "id" is passed as a param', function * () {

          yield request(app)
          .get('/players')
          .expect(200)
          .expect(res => {
            expect(res.body.length).to.equal(3);
            expect(res.body[0]).to.have.all.keys('id', 'username', 'createdAt', 'updatedAt');
            expect(res.body[0].username).to.equal('Alice');
          });
        });

        it('should respond with just one player when an "id" is passes as a param', function * () {

          yield request(app)
          .get('/players?id=2')
          .expect(200)
          .expect(res => {
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.all.keys('id', 'username', 'createdAt');
            expect(res.body[0].username).to.equal('Gilbert');
          });
        });
      });

      describe('POST', () => {

        it_('should respond with a status of 201, and the newly created player', function * () {
          let newPlayer = {username: 'Agustin'};

          yield request(app)
          .post('/players')
          .send(newPlayer)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.all.keys('id', 'username', 'createdAt');
          });
        });

        it_('should fail if the username is already taken', function * () {
          let takenName = {username: 'Alice'};

          let error = 'Key (username)=(Alice) already exists.';

          yield request(app)
          .post('/players')
          .send(takenName)
          .expect(404) // <----- NOTE: totally not the correct error code, but I don't have internet right now
          .expect(res => {
            expect(res.body.detail).to.equal(error);
          });
        });

      });
    });
  });
});
