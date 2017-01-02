require(TEST_HELPER);
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('"/games" API', function() {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  beforeEach(function() {
    return db.migrate.rollback().then(res => {
      return db.migrate.latest();
    }).then(res => {
      return db.seed.run();
    });
  });

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
