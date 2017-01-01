require(TEST_HELPER);
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');

describe('"/players" API', function() {

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
