import { combineReducers } from 'redux';
import data from './data_reducer';
import isError from './isError';
import isLoading from './isLoading';

const rootReducer = combineReducers({
  data,
  isError,
  isLoading
});

export default rootReducer;
