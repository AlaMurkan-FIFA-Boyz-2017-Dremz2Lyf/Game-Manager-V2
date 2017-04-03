//Action types
import {
  RECEIVE
} from '../actions/types';

// Utilities functions
import { applyAll } from '../utilities';

const init = {
  tournaments: {},
  players: {},
  games: {},
  table: {}
};

const data = (state = init, action) => {
  switch (action.type) {
  case RECEIVE:
    return applyAll(state, action);
  default:
    return state;
  }
};

export default data;
