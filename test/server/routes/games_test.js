require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');
const games = require(__server + '/models/games');


describe('API "/games"', function() {
  let sandbox;
  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    return db.migrate.rollback().then(res => {
      return db.migrate.latest();
    }).then(res => {
      return db.seed.run();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('GET', () => {
    it_('should respond with all the games when no "id" or "type" param is passed', function * () {

      yield request(app)
      .get('/games')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(9);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.any.keys('p1', 'p2', 'tournament');
      });
    });

    it_('should return a single game when an "id" and "type" param of "game" is passed', function * () {

      yield request(app)
      .get('/games?id=1&type=game')
      .expect(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.any.keys('id', 'p1', 'p2', 'p1Score', 'p2Score');
      });
    });

    it_('should return all the games for a tournament if "type" of "tournament" is passed', function * () {

      yield request(app)
      .get('/games?id=1&type=tournament')
      .expect(200)
      .expect(res => {
        expect(res.body.every(games => games.tournament === 1)).to.equal(true);
      });
    });

    it_('should return a 500 if the game doesn\'t exist', function * () {
      yield request(app)
      .get('/games?id=10&type=game')
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{"type":"not_found","meta":{"model":"games"}}');
      });
    });

    it_('should return a 500 if the tournament doesn\'t exist', function * () {
      yield request(app)
      .get('/games?id=10&type=tournament')
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{"type":"not_found","meta":{"model":"games"}}');
      });
    });

    it_('should return a 500 if there was an error fetching all games from the db', function * () {
      sandbox.stub(games, 'all').rejects();

      yield request(app)
      .get('/games')
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{}');
        expect(error.path).to.equal('/games');
      });
    });

  });


// This is somewhat deprecated now as games are not currently being created unless they are tied to a tournament. In that case the /tournaments route handles the creating of games.
  describe('POST', () => {
    let tournament = {
      players: [1, 2, 3],
      tournament: 1
    };

    it_('should receive an array of player Ids, and respond with the games created', function * () {

      let newTourney = _.createGames(tournament.players, tournament.tournament);

      let gamesCopy = mockData.games.concat(newTourney);

      yield request(app)
      .post('/games')
      .send(tournament)
      .expect(201)
      .expect(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].id).to.equal(10);
        expect(res.body[1].id).to.equal(11);
        expect(res.body[2].id).to.equal(12);
      });
    });

    it_('should call createGames if there is a tournament in the request body', function * () {
      let createGames = sinon.spy(_, 'createGames');

      yield request(app)
      .post('/games')
      .send(tournament)
      .expect(res => {
        expect(_.createGames.callCount).to.equal(1);
        expect(res.status).to.equal(201);
        _.createGames.restore();
      });

    });

    it_('should respond with 400 if only one player id is sent', function * () {
      let solo = {
        players: [1],
        tournament: 5
      };

      yield request(app)
      .post('/games')
      .send(solo)
      .expect(400)
      .expect(res => {
        expect(res.error.text).to.equal('Games must have at least two players');
      });
    });

    it_('should respond with 500 there is an error with creating the games in the db', function * () {
      sandbox.stub(games, 'create').rejects();

      yield request(app)
      .post('/games')
      .send(tournament)
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{}');
        expect(error.path).to.equal('/games');
      });
    });

  });

  describe('PUT', () => {
    let finishedGame = Object.assign({}, mockData.games[2]);
    finishedGame.p1Score = 3;
    finishedGame.p2Score = 2;

    it_('should accept an updatedGame, respond with 202, and the game', function * () {


      yield request(app)
      .put('/games')
      .send(finishedGame)
      .expect(202)
      .expect(res => {
        expect(res.accepted).to.equal(true);
        expect(res.body[0].id).to.equal(finishedGame.id);
      });
    });

    it_('should respond with 500 there is an error with creating the games in the db', function * () {
      sandbox.stub(games, 'updateOne').rejects();

      yield request(app)
      .put('/games')
      .send(finishedGame)
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{}');
        expect(error.path).to.equal('/games');
      });
    });
  });

});
