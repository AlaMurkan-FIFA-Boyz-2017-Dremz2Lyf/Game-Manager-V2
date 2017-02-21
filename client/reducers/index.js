import { combineReducers } from 'redux';
import tournamentsReducer from './tournaments_reducer';

const rootReducer = combineReducers({
  tournaments: tournamentsReducer
});

export default rootReducer;
