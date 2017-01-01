require(TEST_HELPER); // <--- This must be at the top of every test file.
const request = require('supertest-as-promised');
const routes = require(__server + '/index.js');
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');
const db = require(__server + '/db.js');


describe('The Server', function() {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();


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
});
