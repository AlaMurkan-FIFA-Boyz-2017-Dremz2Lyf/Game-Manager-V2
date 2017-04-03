require(TEST_HELPER); // <--- This must be at the top of every test file.
const request = require('supertest');
const routes = require(__server + '/index.js');

describe('The Server', function() {

  let app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('should serve the static files on calls to "/"', function * () {

    yield request(app)
    .get('/')
    .expect(200)
    .expect((res) => {
      expect(res.text).to.be.a('string');
      expect(TestHelper.checkForHtml(res.text)).to.equal(true);
    });
  });

});
