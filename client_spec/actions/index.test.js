//Dependancies
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Actions
import {
  setErrored,
  setLoading,
  fetch,
  create,
  receive,
  update
 } from '../../client/actions/index';

// Action types
import {
  SET_ERRORED,
  SET_LOADING,
  FETCH,
  RECEIVE
} from '../../client/actions/types';

// Bring in our normalize utilities for equality testing.
import { normalize } from '../../client/utilities';

// setup our mock store with thunk middleware to test actions dispatch other actions.
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
let store;

describe('Actions', () => {

  beforeEach(() => {
    store = mockStore({
      data: {},
      isLoading: {},
      isError: {}
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  // describe('Error handling', () => {
  //   test('should error when hitting a bad endpoint', () => {
  //     let action = fetch('totally not a valid endpoint');
  //     let expected = [
  //       setLoading('totally not a valid endpoint', true),
  //       setErrored('totally not a valid endpoint', {})
  //     ];
  //
  //     store.dispatch(action);
  //     expect(store.getActions()).toEqual([expected]);
  //   });
  // });

  describe('Data actions', () => {

    test('fetch', () => {

      let expected = [
        setLoading('games', true),
        receive('games', mockData.games),
        setLoading('games', false)
      ];
      return store.dispatch(fetch('games', {tournamentId: 1})).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    test('receive', () => {
      let action = receive('tournaments', mockData.tournaments.slice());
      let expected = {
        type: RECEIVE,
        payload: {
          stateKey: 'tournaments',
          data: normalize(mockData.tournaments.slice())
        }
      };

      store.dispatch(action);
      expect(store.getActions()).toEqual([expected]);
    });

    test('receive should throw an error if the data passed to it is not an array', () => {
      expect(() => { receive('tournaments', {}); }).toThrow(/data argument should be an array/);
    });

    test('create', () => {
      let newGame = {p1: 2, p2: 3};

      let expected = [
        setLoading('games', true),
        setLoading('games', true),
        receive('games', [mockData.newGame]),
        setLoading('games', false)
      ];
      return store.dispatch(create('games', newGame)).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    test('update', () => {
      let updatedGame = mockData.games.slice(0, 1);
      updatedGame.p1Score = 3;
      updatedGame.p1Score = 2;

      let expected = [
        setLoading('games', true),
        setLoading('games', true),
        receive('games', [updatedGame].slice()),
        setLoading('games', false)
      ];

      return store.dispatch(update('games', updatedGame)).then(() => {
        expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expected));
      });
    });

  });

});
