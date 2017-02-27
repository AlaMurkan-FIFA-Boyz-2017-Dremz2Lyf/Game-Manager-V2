require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('API "/tournaments"', function() {

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
    let spy;
    it_('should respond with a status of 201, and call createGames', function * () {
      spy = sinon.spy(_, 'createGames');

      let tournament = {
        name: 'ultraTourney!',
        added: {
          1: {},
          2: {},
          3: {}
        }
      };

      yield request(app)
      .post('/tournaments')
      .send(tournament)
      .expect(201)
      .expect(res => {
        expect(spy.called).to.equal(true);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('id', 'name');
        expect(res.body.name).to.equal('ultraTourney!');
        spy.restore();
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
        expect(res.body.winner).to.equal(2);
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
