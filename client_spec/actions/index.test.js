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

  describe('Error handling', () => {
    test('receive should throw an error if the data passed to it is not an array', () => {
      let error = new TypeError('Second argument passed to "receive" action should be an array', 'actions/index.js', 31);
      let expected = [
        setErrored('tournaments', error)
      ];

      store.dispatch(receive('tournaments', {}));
      expect(store.getActions()).toEqual(expected);
    });
  });

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


    test('create', () => {
      let newGame = {p1: 2, p2: 3};

      let expected = [
        setLoading('games', true),
        setLoading('games', true),
        receive('games', [mockData.newGame]),
        setLoading('games', false)
      ];

      return store.dispatch(create('games', newGame)).then(() => {

        return expect(store.getActions()).toEqual(expected);
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
