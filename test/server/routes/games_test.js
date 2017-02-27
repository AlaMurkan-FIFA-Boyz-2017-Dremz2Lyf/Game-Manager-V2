require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('API "/games"', function() {

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

  });


// This is somewhat deprecated now as games are not currently being created unless they are tied to a tournament. In that case the /tournaments route handles the creating of games.
  describe('POST', () => {
    let tournament = {
      players: [1, 2, 3],
      tournament: 1
    };

    it_('should receive an array of player Ids, save new games in the database, and respond with the games created', function * () {

      let newTourney = _.createGames(tournament.players, tournament.tournament);

      let lastId = mockData.games.length;

      let gamesCopy = mockData.games.concat(newTourney);

      yield request(app)
      .post('/games')
      .send(tournament)
      .expect(201)
      .expect(res => {
        expect(res.body).to.be.a('object');
        expect(res.body[0]).to.deep.equal(newTourney[0]);
      })
      .then(function * (res) {
        yield request(app)
        .get('/games')
        .expect(res => {
          expect(res.body).to.deep.equal(gamesCopy);
        });
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

  });

  describe('PUT', () => {

    it_('should update the game in the database and respond with 202, and the updated game', function * () {

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
          let theGame = res.body.filter(game => game.id === 3)[0];
          expect(theGame.p2Score).to.equal(2);
          expect(theGame.p1Score).to.equal(3);
        })
      );
    });
  });

});
