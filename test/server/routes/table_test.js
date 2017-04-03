require(TEST_HELPER);
const request = require('supertest');
const routes = require(__server + '/index.js');
const sinon = require('sinon');
const table = require(__server + '/models/table.js');
const _ = require(__server + '/utilities.js');
const db = require(__server + '/db');

describe('API "/table"', () => {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  beforeEach(() =>
    db.migrate.rollback().then(res =>
      db.migrate.latest()
    ).then(res =>
      db.seed.run()
    )
  );

  describe('GET', () => {

    it_('should respond with 200 and a table representing all players', function * () {
      let createSpy = sinon.spy(_, 'createTable');
      let modelSpy = sinon.spy(table, 'getTable');
      let expected;

      yield request(app)
      .get('/table')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['1', '2']);
        expect(createSpy.called).to.equal(true);
        expect(modelSpy.called).to.equal(true);
        _.createTable.restore();
        table.getTable.restore();
      });
    });

  });
});
