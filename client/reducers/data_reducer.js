//Action types
import {
  RECEIVE
} from '../actions/types';

// Utilities functions
import { applyPayload } from '../utilities';

const init = {
  tournaments: {},
  players: {},
  games: {}
};

export default function(state = init, action) {
  switch (action.type) {
  case RECEIVE:
    return applyPayload(state, action);
  default:
    return state;
  }

}
