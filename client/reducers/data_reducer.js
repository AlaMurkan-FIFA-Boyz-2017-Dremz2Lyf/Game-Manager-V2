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
  allTime: {}
};

export default function(state = init, action) {
  switch (action.type) {
  case RECEIVE:
    return applyAll(state, action);
  default:
    return state;
  }

}
