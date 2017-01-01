require(TEST_HELPER);
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('"/tournaments" route', function() {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  beforeEach(function(done) {
    db.migrate.rollback().then(res => {
      db.migrate.latest().then(res => {
        return db.seed.run().then(res => {
          done();
        });
      });
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
