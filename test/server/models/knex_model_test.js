const model = require(__server + '/models/lib/knex_model');
const games = require(__server + '/models/games');
const db = require(__server + '/db');
const sinon = require('sinon');

describe('knex_model', () => {

  beforeEach(() =>
    db.migrate.rollback().then(res =>
      db.migrate.latest()
    ).then(res =>
      db.seed.run()
    )
  );

  it('should error if there is no tableName given', () => {
    expect(model.create.bind(this, 'errorModel')).to.throw(Error, /must specify a tableName/);
  });

  it('findBy should reject with a NotFound if the row doesn\'t exist', () => {
    return games.findBy({id: 150}).then(res =>
      res
    ).catch(err => {
      expect(err.type).to.equal('not_found');
      expect(err.meta).to.deep.equal({model: 'games'});
    });
  });

  it('should call "create" if "save" is passed no id attribute', () => {
    let spy = sinon.spy(games, 'create');
    let newGame = {p1: 1, p2: 2};
    games.save(newGame);

    expect(spy.called).to.equal(true);
    expect(spy.calledWithExactly(newGame)).to.equal(true);
    games.create.restore();
  });

  it('should call "create" if "save" is passed no id attribute', () => {
    let game = {id: 150, p1: 1, p2: 2};

    return games.updateOne(game).then(res =>
      res
    ).catch(err => {
      expect(err.type).to.equal('not_found');
      expect(err.meta).to.deep.equal({model: 'games'});
    });
  });

});
