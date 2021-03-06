require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');
const players = require(__server + '/models/players');

describe('API "/players"', function() {
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

    it_('should respond with 200, and all players when no "id" is passed as a param/query', function * () {

      let expected = Object.keys(mockData.players[0]);


      yield request(app)
      .get('/players')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(3);
        expect(res.body[0]).to.have.all.keys(expected);
        expect(res.body[0].username).to.equal('Alice');
      });
    });

    it_('should respond with just one player when an "id" is passed as a param/query', function * () {

      let expected = Object.keys(mockData.players[0]);

      yield request(app)
      .get('/players?id=2')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0]).to.have.all.keys(expected);
        expect(res.body[0].username).to.equal('Gilbert');
      });
    });

    it_('should respond with 404 if the player was not found', function * () {
      sandbox.stub(players, 'find').rejects();
      yield request(app)
      .get('/players?id=2')
      .expect(404);
    });

    it_('should respond with 404 if no player was not found', function * () {
      sandbox.stub(players, 'all').rejects();

      yield request(app)
      .get('/players')
      .expect(404);
    });

  });

  describe('POST', () => {

    it_('should respond with 201, and the newly created player', function * () {
      let newPlayer = {username: 'agustin'};

      yield request(app)
      .post('/players')
      .send(newPlayer)
      .expect(201)
      .expect(res => {
        expect(res.body[0]).to.have.any.keys('id', 'username', 'createdAt', 'updatedAt', 'isTeam');
        expect(res.body[0].username).to.equal('Agustin');
      });
    });

    it_('should fail if the username is already taken', function * () {
      let takenName = {username: 'Alice'};

      let error = 'Key (username)=(Alice) already exists.';

      yield request(app)
      .post('/players')
      .send(takenName)
      .expect(409)
      .expect(res => {
        expect(res.body.detail).to.equal(error);
      });
    });

  });

  describe('PUT', () => {

    it_('should accept a single player object. Respond with 202 and the updated player', function * () {
      let players = mockData.players.slice(2, 3);
      let body = {players};

      yield request(app)
      .put('/players')
      .send(body)
      .expect(202)
      .expect(({body}) => {
        expect(body).to.be.an('array');
        expect(body[0].id).to.equal(3);
        expect(body[0].username).to.equal('Bob');
      });
    });

    it_('should accept two player objects. Respond with 202 and the updated player', function * () {
      let players = mockData.players.slice(1, 3);
      let body = {players};

      yield request(app)
      .put('/players')
      .send(body)
      .expect(202)
      .expect(({body}) => {
        expect(body).to.be.an('array');
      });
    });

    it_('should error if there is no "id" given for the update', function * () {
      let players = [Object.assign({}, mockData.players[2])];
      delete players[0].id;
      let body = {players};

      yield request(app)
      .put('/players')
      .send(body)
      .expect(400)
      .expect(({error}) => {
        expect(error.text).to.equal('{"type":"invalid_argument","meta":{"model":"players"}}');
      });
    });

    it_('should error if the body doesn\'t have a players key holding an array', function * () {
      let players = Object.assign({}, mockData.players[2]);

      let body = {players};

      yield request(app)
      .put('/players')
      .send(body)
      .expect(400)
      .expect(({error}) => {
        expect(error.text).to.equal('PUT to /players requires the body to have a "players" key holding and Array');
      });
    });

  });


  /*
    NOTE:
    Deleting players will be tricky due to PostgreSQL. Cannot delete a player without removing the foreign key from every game they are in... which is something to be worked on later :P
  */
  // describe('DELETE', () => {
  //   it_('should accept an "id", delete the player from the database, and respond with 200', function * () {
  //
  //     yield request(app)
  //     .delete('/players?id=2')
  //     .expect(200)
  //     .then(function * (res) {
  //       yield request(app)
  //       .get('/players')
  //       .expect(res => {
  //         expect(res.body.some(player => player.id === 2)).to.equal(false);
  //       });
  //     });
  //   });
  //
  //   it_('should error if there is no "id" given for the player', function * () {
  //
  //     yield request(app)
  //     .delete('/players')
  //     .expect(404);
  //   });
  // });
});
