require(TEST_HELPER);
const _ = require(__server + '/utilities.js');
const sinon = require('sinon');

describe('Utilities', function() {

  it('should be importable', () => {
    expect(_).to.be.an('object');
  });

  describe('createGames', () => {

    it('should be a function', () => {
      expect(_.createGames).to.be.a('function');
    });

    it('should error if the first argument is not an array', () => {
      expect(_.createGames.bind(this, {invalid: 'invalid'}, 8), 1).to.throw(TypeError, /must be an array/);
    });

    it('should error if the array does not contain numbers', () => {
      expect(_.createGames.bind(this, ['1', '2', 3, 4], 2, 2)).to.throw(TypeError, /should be numbers/);
    });

    it('should error if the array does not contain numbers', () => {
      expect(_.createGames.bind(this, ['1', 2, 3, 4], 2, 2)).to.throw(TypeError, /should be numbers/);
    });


    it('should error if the second argument is not a number', () => {
      expect(_.createGames.bind(this, [1, 2, 3], '4', 1)).to.throw(TypeError, /must be a number/);
    });

    it('should return an array of game objects to be inserted into the database', () => {
      let newGames = _.createGames([1, 2, 3, 4], 2);

      expect(newGames).to.be.a('array');
      expect(newGames[0]).to.be.a('object');
      expect(newGames[0]).to.have.any.keys('p1', 'p2', 'tournament', 'createdAt');
    });

    it('should accept a third argument for the rounds to be played', () => {
      let newGames = _.createGames([1, 2, 3, 4], 2, 4);

      expect(newGames.length).to.equal(24);
      expect(newGames[0]).to.have.any.keys('p1', 'p2', 'tournament', 'createdAt');
    });
  });

  describe('formatName', () => {

    it('should be a function', () => {
      expect(_.formatName).to.be.a('function');
    });

    it('should accept a string, Error on incorrect types', () => {
      expect(() => _.formatName('person')).to.not.throw(TypeError, /must be a string/);
      expect(() => _.formatName([])).to.throw(TypeError, /must be a string/);
    });

    it('should output the correctly formated string', () => {
      let formatted = _.formatName('lola');

      expect(formatted).to.equal('Lola');
      expect(formatted).to.not.equal('lOLA');
    });

  });

  describe('createTable', () => {
    let emptyTable, spy;

    before(() => {
      spy = sinon.spy(_, 'applyGame');
      emptyTable = _.createTable(mockData.players, mockData.games);
    });

    after(() => {
      spy.restore();
    });

    it('should be a function', () => {
      expect(_.createTable).to.be.a('function');
    });

    it('should return an object of nested objects', () => {

      expect(emptyTable).to.be.an('object');
      expect(emptyTable[1]).to.be.an('object');
      expect(emptyTable[2]).to.be.an('object');
      expect(emptyTable[3]).to.be.an('object');
    });

    it('each object should have the relevent information', () => {
      let keys = ['username', 'id', 'wins', 'losses', 'draws', 'goalsFor', 'goalsAgainst', 'shots', 'onGoal', 'reds', 'yellows', 'poss', 'points', 'goalDiff', ];

      expect(emptyTable[1]).to.have.all.keys(keys);
      expect(emptyTable[2]).to.have.all.keys(keys);
    });

    it('each object should have the player username and id', () => {

      expect(emptyTable[1].username).to.not.be.undefined;
      expect(emptyTable[1].username).to.equal('Alice');
      expect(emptyTable[2].username).to.not.be.undefined;
      expect(emptyTable[2].username).to.equal('Gilbert');
    });

    it('should call applyGame once for every game', () => {

      expect(spy.called).to.equal(true);
      expect(spy.callCount).to.equal(9);
    });

  });

});
