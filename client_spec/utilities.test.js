import { normalize, applyPayload } from '../client/utilities';


describe('Utilities', () => {

  describe('Normalize', () => {

    it('should normalize an array into an object with numeric keys', () => {
      let input = mockData.tournaments.slice();
      let output = normalize(input);
      expect(Object.keys(output)).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5']).sample);
    });

  });

  describe('applyPayload', () => {

    it('should not mutate the original state', () => {
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

});
