require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');
const tournaments = require(__server + '/models/tournaments');
const games = require(__server + '/models/games');


describe('API "/tournaments"', function() {

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

    it_('should respond with all the tournaments when no id is passed as a param', function * () {

      yield request(app)
      .get('/tournaments')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2);
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
        expect(res.body[0].name).to.equal('2 Rounds');
      });
    });

    it_('should respond with 404 if the tournament was not found', function * () {
      sandbox.stub(tournaments, 'find').rejects();
      yield request(app)
      .get('/tournaments?id=2')
      .expect(404);
    });

    it_('should respond with 404 if no tournament was not found', function * () {
      sandbox.stub(tournaments, 'all').rejects();

      yield request(app)
      .get('/tournaments')
      .expect(404);
    });
  });

  describe('POST', () => {

    let tournament = {
      name: 'ultraTourney!',
      added: [1, 2, 3]
    };

    it_('should respond with a status of 201, and call createGames', function * () {
      let spiedCreate = sinon.spy(_, 'createGames');

      yield request(app)
      .post('/tournaments')
      .send(tournament)
      .expect(201)
      .expect(res => {
        expect(spiedCreate.called).to.equal(true);
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.have.any.keys('id', 'totalGames', 'updatedAt');
        expect(res.body[0].id).to.equal(3);
        _.createGames.restore();
      });
    });

    it_('should 400 when no tournament name is present', function * () {

      yield request(app)
      .post('/tournaments')
      .send({name: ''})
      .expect(400)
      .expect(res => {
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Tournaments must have a name!');
      });
    });

    it_('should respond with 500 if there was an error creating the tournament', function * () {
      sandbox.stub(tournaments, 'create').rejects();
      yield request(app)
      .post('/tournaments')
      .send(tournament)
      .expect(500);
    });

    it_('should respond with 500 if there was an error saving tournament with totalGames', function * () {
      sandbox.stub(tournaments, 'save').rejects();

      yield request(app)
      .post('/tournaments')
      .send(tournament)
      .expect(500);
    });

    it_('should respond with 500 if there was an error creating the games', function * () {
      sandbox.stub(games, 'create').rejects();

      yield request(app)
      .post('/tournaments')
      .send(tournament)
      .expect(500);
    });

  });

  describe('PUT', () => {
    let updatedTournament = Object.assign({}, mockData.tournaments[0]);
    updatedTournament.winner = 2;

    it_('should accept an updated tournament. Respond with 202 and the updated properties', function * () {

      yield request(app)
      .put('/tournaments')
      .send(updatedTournament)
      .expect(202)
      .expect(({body}) => {
        expect(body[0]).to.be.an('object');
        expect(body[0].id).to.equal(1);
        expect(body[0].name).to.equal('Super Tourney!');
        expect(body[0].winner).to.equal(2);
      });
    });

    it_('should error if there is no "id" given for the update', function * () {
      let noId = Object.assign({}, mockData.tournaments[1]);
      delete noId.id;

      yield request(app)
      .put('/tournaments')
      .send(noId)
      .expect(400)
      .expect(res => {
        expect(res.error.text).to.equal('invalid_argument');
      });
    });

    it_('should respond with 500 if there was an error updating the tournament', function * () {
      sandbox.stub(tournaments, 'updateOne').rejects('ReferenceError');

      yield request(app)
      .put('/tournaments')
      .send(updatedTournament)
      .expect(500)
      .expect(({error}) => {
        expect(error.text).to.equal('{"name":"ReferenceError"}');
      });
    });
  });

});
