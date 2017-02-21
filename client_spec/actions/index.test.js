import {
  tournamentsError,
  requestTournaments,
  receiveTournaments
} from '../../client/actions/tournaments_actions';

import {
  TOURNAMENTS_ERROR,
  POST_TOURNAMENTS,
  FETCH_TOURNAMENTS,
  REQUEST_TOURNAMENTS,
  RECEIVE_TOURNAMENTS
} from '../../client/actions/types';


describe('Actions', () => {

  describe('Tournaments action types', () => {
    test('error', () => {
      expect(TOURNAMENTS_ERROR).toBe('TOURNAMENTS_ERROR');
    });
    test('POST', () => {
      expect(POST_TOURNAMENTS).toBe('POST_TOURNAMENTS');
    });
    test('FETCH', () => {
      expect(FETCH_TOURNAMENTS).toBe('FETCH_TOURNAMENTS');
    });
    test('REQUEST', () => {
      expect(REQUEST_TOURNAMENTS).toBe('REQUEST_TOURNAMENTS');
    });
    test('RECEIVE', () => {
      expect(RECEIVE_TOURNAMENTS).toBe('RECEIVE_TOURNAMENTS');
    });

  });

  describe('Tournaments actions', () => {

    test('error', () => {
      let action = tournamentsError('post');
      let expected = {
        type: TOURNAMENTS_ERROR,
        source: 'post'
      };
      expect(action).toEqual(expected);
    });

/*
  Probably don't need to test actions, just test the reducers.
  Which becomes apparent when working with the async stuff. These are tested easier with the reducer tests
*/
    // test('POST', () => {
    //
    //   expect().toEqual();
    // });
    //
    // test('FETCH', () => {
    //   expect().toEqual();
    // });

    test('REQUEST', () => {
      let action = requestTournaments();
      let expected = {
        type: REQUEST_TOURNAMENTS
      };
      expect(action).toEqual(expected);
    });

    test('RECEIVE', () => {
      let action = receiveTournaments(mockData.tournaments.slice());
      let expected = {
        type: RECEIVE_TOURNAMENTS,
        tournaments: mockData.tournaments.slice()
      };
      expect(action).toEqual(expected);
    });
  });

});
