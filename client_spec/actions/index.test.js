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

describe('Actions Creators', () => {

  beforeEach(() => {
    store = mockStore({
      data: {
        players: {},
        tournaments: {},
        games: {}
      },
      isLoading: {},
      isError: {}
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Error handling', () => {

    test('fetch should dispatch an error if the request was bad', () => {

      let error = {
        status: 400,
        data: 'Bad request'
      };

      let expected = [
        setLoading('tournaments', true),
        setErrored('tournaments', error),
        setLoading('tournaments', false)
      ];

      return store.dispatch(fetch('tournaments', {rando: 'somethingInvalid'})).then(() => {
        return expect(store.getActions()).toEqual(expected);
      });
    });

    test('create should dispatch an error if the requested was bad', () => {

      let error = {
        status: 400,
        data: 'Bad request'
      };

      let expected = [
        setLoading('tournaments', true),
        setErrored('tournaments', error),
        setLoading('tournaments', false)
      ];

      return store.dispatch(create('tournaments', 'somethingInvalid')).then(() => {
        return expect(store.getActions()).toEqual(expected);
      });
    });

    test('update should dispatch an error if the requested was bad', () => {

      let error = {
        status: 400,
        data: 'Bad request'
      };

      let expected = [
        setLoading('tournaments', true),
        setErrored('tournaments', error),
        setLoading('tournaments', false)
      ];

      return store.dispatch(update('tournaments', 'somethingInvalid')).then(() => {
        return expect(store.getActions()).toEqual(expected);
      });
    });

  });

  describe('Data Actions', () => {

    test('fetch with parameters', () => {
      let expectedGames = mockData.games.filter(game => game.tournament === 1);

      let expected = [
        setLoading('games', true),
        receive('games', expectedGames),
        setLoading('games', false)
      ];
      return store.dispatch(fetch('games', {type: 'tournament', id: 1})).then(() => {
        let actions = store.getActions();
        expect(actions).toEqual(expected);
      });
    });

    test('fetch without parameters', () => {

      let expected = [
        setLoading('games', true),
        receive('games', mockData.games),
        setLoading('games', false)
      ];
      return store.dispatch(fetch('games')).then(() => {
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

    test('receive should handle objects as well as arrays', () => {
      let data = normalize(mockData.tournaments.slice());
      let action = receive('tournaments', data);
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
        receive('games', normalize([mockData.newGame])),
        setLoading('games', false)
      ];

      return store.dispatch(create('games', newGame)).then(() =>
        expect(store.getActions()).toEqual(expected)
      );
    });

    test('update', () => {
      let updatedGame = {...mockData.games.slice(0, 1)[0]};
      updatedGame.p1Score = 3;
      updatedGame.p2Score = 2;

      let expected = [
        setLoading('games', true),
        receive('games', normalize([updatedGame])),
        setLoading('games', false)
      ];

      return store.dispatch(update('games', updatedGame)).then(() =>
        expect(store.getActions()).toEqual(expected)
      );
    });

  });
});
