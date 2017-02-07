require(TEST_HELPER);

const actions = require(__client + '/actions/index.js');


describe('Actions', () => {
  it('should be an object', () => {

    expect(actions).to.be.an('object');
  });

});
