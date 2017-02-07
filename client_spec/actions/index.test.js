const actions = require(__client + '/actions/index.js');

describe('Actions', () => {
  it('should be an object', () => {

    expect(typeof actions).toBe('object');
  });

});
