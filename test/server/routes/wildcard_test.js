require(TEST_HELPER); // <--- This must be at the top of every test file.
const request = require('supertest');
const routes = require(__server + '/index.js');

describe('Wildcard', () => {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('should handle wild card requests to any random path', function * () {

    yield request(app)
    .get('/somethingThatsNotThere')
    .expect(200)
    .expect((res) => {
      expect(res.text).to.be.a('string');
      expect(TestHelper.checkForHtml(res.text)).to.equal('<html>');
    });
  });

});
