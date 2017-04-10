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
      table = _.createTable(mockData.players, mockData.games);
    });

    after(() => {
      spy.restore();
    });

    it('should be a function', () => {
      expect(_.createTable).to.be.a('function');
    });

    it('should return an object of nested objects', () => {

      expect(table).to.be.an('object');
      expect(table[1]).to.be.an('object');
      expect(table[2]).to.be.an('object');
      expect(table[3]).to.be.an('object');
    });

    it('each object should have the relevent information', () => {
      let keys = ['username', 'id', 'wins', 'losses', 'draws', 'goalsFor', 'goalsAgainst', 'shots', 'onGoal', 'reds', 'yellows', 'poss', 'points', 'goalDiff', 'passAcc'];

      expect(table[1]).to.have.all.keys(keys);
      expect(table[2]).to.have.all.keys(keys);
    });

    it('each object should have the player username and id', () => {

      expect(table[1].username).to.not.be.undefined;
      expect(table[1].username).to.equal('Alice');
      expect(table[2].username).to.not.be.undefined;
      expect(table[2].username).to.equal('Gilbert');
    });

    it('should call applyGame once for every game', () => {

      expect(spy.called).to.equal(true);
      expect(spy.callCount).to.equal(9);
    });

  });

  describe('applyGame', () => {

    it('should handle draws', () => {
      let game = Object.assign({}, mockData.games[0]);
      game.p1Score = 1;
      game.p2Score = 1;

      let table = {
        1: {wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: [], points: 0, goalDiff: 0, passAcc: []},
        2: {wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: [], points: 0, goalDiff: 0, passAcc: []}
      };

      let expected = {
        1: {wins: 0, losses: 0, draws: 1, goalsFor: 1, goalsAgainst: 1, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: [null], points: 1, goalDiff: 0, passAcc: [null]},
        2: {wins: 0, losses: 0, draws: 1, goalsFor: 1, goalsAgainst: 1, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: [null], points: 1, goalDiff: 0, passAcc: [null]}
      };

      expect(_.applyGame(table, game)).to.deep.equal(expected);
    });

  });

  describe('envStaticPath', () => {

    it('should return the correct path base for different NODE_ENVs', () => {
      expect(_.envStaticPath('production')).to.equal('public');
      expect(_.envStaticPath('anything else')).to.equal('devPublic');
    });

  });

});
