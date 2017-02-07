const reducers = require(__client + '/reducers/index.js');

describe('Reducers', () => {
  it('should return an object', () => {

    expect(typeof reducers).toBe('object');

  });

});
