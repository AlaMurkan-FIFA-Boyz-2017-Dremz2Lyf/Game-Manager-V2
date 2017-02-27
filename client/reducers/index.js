// Dependancies
import { combineReducers } from 'redux';

// formReducer from redux-form
import { reducer as formReducer } from 'redux-form';

// Our reducers
import data from './data_reducer';
import isError from './isError';
import isLoading from './isLoading';

const rootReducer = combineReducers({
  data,
  isError,
  isLoading,
  form: formReducer
});

export default rootReducer;
