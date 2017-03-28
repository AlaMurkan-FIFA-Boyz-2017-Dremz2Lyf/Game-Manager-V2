import {
  normalize,
  applyAll,
  percentPlayed,
  getValidationState,
  required,
  possValidation,
  helpMessage,
  buildTable
} from '../client/utilities';


describe('Utilities', () => {

  describe('Normalize', () => {

    test('should normalize an array into an object with numeric keys', () => {
      let input = mockData.tournaments.slice();
      let output = normalize(input);
      expect(Object.keys(output)).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5']).sample);
    });

    test('should return an empty object if passed an empty array', () => {
      let output = normalize([]);
      expect(output).toEqual({});
    });

  });

  describe('applyAll', () => {

    test('should not mutate the original state', () => {
      let initial = {
        players: false
      };
      let expected = {
        players: true
      };

      expect(applyAll(initial, { payload: {stateKey: 'players', data: true}})).toEqual(expected);
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

  describe('getValidationState', () => {

    test('should return null if the form is pristine and valid', () => {
      expect(getValidationState(true, true)).toBeNull();
    });

    test('should return "success" if the form is not pristine and valid', () => {
      expect(getValidationState(true, false)).toBe('success');
    });

    test('should return "error" if the form is invalid and not pristine', () => {
      expect(getValidationState(false, false)).toBe('error');
    });

  });

  describe('required', () => {

    test('should return a string if there is no value for the input', () => {
      let input = '';

      expect(required(input)).toBe('Required');
    });

    test('should return undefined if there is a valid passed in', () => {
      let input = 'Something';

      expect(required(input)).toBeUndefined();
    });

  });

  describe('possValidation', () => {

    test('should return undefined if both possession values are undefined', () => {
      let both = {};

      expect(possValidation({}, both)).toBeUndefined();
    });

    test('should return undefined if just one possession value is defined', () => {
      let justP1 = {p1Poss: '00'};
      let justP2 = {p2Poss: '00'};

      expect(possValidation({}, justP1)).toBe('Possession should add up to 100%!');
      expect(possValidation({}, justP2)).toBe('Possession should add up to 100%!');
    });

    test('should return the warning string if the total is not 100', () => {
      let notEnough = {p1Poss: '34', p2Poss: '55'};

      expect(possValidation({}, notEnough)).toBe('Possession should add up to 100%!');
    });

    test('should return undefined if the values total to 100', () => {
      let goodToGo = {p1Poss: '45', p2Poss: '55'};

      expect(possValidation({}, goodToGo)).toBeUndefined();
    });
  });

  describe('helpMessage', () => {
    test('should return the correct string for the Score field', () => {
      let expected = 'Score is required! I mean.. come on!';

      expect(helpMessage('Score')).toBe(expected);
    });

    test('should return the correct string for the Score field', () => {
      let expected = 'Shots will default to 0 if not given.';

      expect(helpMessage('Shots')).toBe(expected);
    });

  });

  describe('buildTable', () => {
    test('should take in games and return a table', () => {
      let input = normalize(mockData.games.slice(0, 3));
      input[1].p1Score = 3;
      input[1].p2Score = 2;
      input[1].p1Poss = .75;
      input[1].p2Poss = .25;
      input[2].p1Score = 1;
      input[2].p2Score = 2;
      input[2].p1Poss = .50;
      input[2].p2Poss = .50;

      let expected = {
        1: {wins: 1, losses: 1, draws: 0, goalsFor: 4, goalsAgainst: 4, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: .625},
        2: {wins: 0, losses: 1, draws: 0, goalsFor: 2, goalsAgainst: 3, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: .25},
        3: {wins: 1, losses: 0, draws: 0, goalsFor: 2, goalsAgainst: 1, shots: 0, onGoal: 0, reds: 0, yellows: 0, poss: .50}
      };

      expect(buildTable(input)).toEqual(expected);
    });
  });

});
