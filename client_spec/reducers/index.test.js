// Dependancies
import { createStore } from 'redux';


// Reducers
import rootReducer from '../../client/reducers/index';
import data from '../../client/reducers/data_reducer';
import isError from '../../client/reducers/isError';
import isLoading from '../../client/reducers/isLoading';

// Actions
import {
  setErrored,
  setLoading,
  receive
} from '../../client/actions/index';


describe('Reducers', () => {
  let store = createStore(rootReducer);

  describe('root reducer', () => {

    test('should return the initialState', () => {

      expect(store.getState().data).toEqual(data(undefined, {}));
    });

  });

  // describe('Error reducer', () => {
  //
  //   test('should handle errors for the correct data set', () => {
  //     let errorAction = setErrored('tournaments', true);
  //     let fixedError = setErrored('tournaments', false);
  //     let newError = setErrored('players', true);
  //
  //     store.dispatch(errorAction);
  //     expect(store.getState().isError).toEqual(isError(undefined, errorAction));
  //
  //     store.dispatch(fixedError);
  //     store.dispatch(newError);
  //     expect(store.getState().isError).toEqual(isError(undefined, newError));
  //     store.dispatch(setErrored('players', false));
  //   });
  //
  // });

  describe('Loading reducer', () => {

    it('should handle loading events properly', () => {
      let loadTournaments = setLoading('tournaments', true);
      let gotTournaments = setLoading('tournaments', false);
      let loadPlayers = setLoading('players', true);

      store.dispatch(loadTournaments);
      expect(store.getState().isLoading).toEqual(isLoading(undefined, loadTournaments));

      store.dispatch(gotTournaments);
      store.dispatch(loadPlayers);
      expect(store.getState().isLoading).toEqual(isLoading(undefined, loadPlayers));
      store.dispatch(setLoading('players', false));
    });

  });

  describe('Data reducer', () => {

    test('should return the initialState', () => {

      expect(data(undefined, {})).toEqual({games: {}, players: {}, tournaments: {}});
    });

    test('should return normalized state', () => {

      let action = receive('games', mockData.games);
      store.dispatch(action);
      expect(store.getState().data).toEqual(data(undefined, action));
      expect(store.getState().isError).toEqual(isError(undefined, action));
      expect(store.getState().isLoading).toEqual(isLoading(undefined, action));
    });
  });

});
