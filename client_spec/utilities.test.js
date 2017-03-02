import { normalize, applyPayload, percentPlayed } from '../client/utilities';


describe('Utilities', () => {

  describe('Normalize', () => {

    test('should normalize an array into an object with numeric keys', () => {
      let input = mockData.tournaments.slice();
      let output = normalize(input);
      expect(Object.keys(output)).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5']).sample);
    });

  });

  describe('applyPayload', () => {

    test('should not mutate the original state', () => {
      let initial = {
        players: false
      };
      let expected = {
        players: true
      };

      expect(applyPayload(initial, { payload: {stateKey: 'players', data: true}})).toEqual(expected);
      expect(initial).toEqual({players: false});
    });

  });

  describe('percentPlayed', () => {

    test('should take two arguments in and return a Number', () => {
      let gamesPlayed = 2;
      let totalGames = 8;

      let result = percentPlayed(gamesPlayed, totalGames);
      expect(result).toEqual(25);
    });
  });

});
