// Dependancies
import configureStore from 'redux-mock-store';

// Reducers
import rootReducer from '../../client/reducers/index';
import tournamentsReducer from '../../client/reducers/tournaments_reducer';

// actions
import {
  tournamentsError,
  requestTournaments
} from '../../client/actions/tournaments_actions';

const middlewares = [];
const mockStore = configureStore(middlewares);



describe('Reducers', () => {
  let store;
  describe('root reducer', () => {

    test('should return the initialState', () => {
      store = mockStore(rootReducer);
      expect(store.getState().tournaments).toEqual(tournamentsReducer(undefined, {}));
    });

  });

  describe('Tournaments reducer', () => {
    let initialState;

    test('should return the initialState', () => {
      initialState = {
        waiting: false,
        error: false
      };

      expect(tournamentsReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle actions properly', () => {
      let error = tournamentsError('post');
      store = mockStore(rootReducer);

      store.dispatch(error);
      expect(store.getState().tournaments).toEqual(tournamentsReducer(undefined, error));
      let request = requestTournaments();
      store.dispatch(request);
      expect(store.getState().tournaments).toEqual(tournamentsReducer(undefined, request));
    });

  });

});
