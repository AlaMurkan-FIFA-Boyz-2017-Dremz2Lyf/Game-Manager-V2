import { SET_ERRORED } from '../actions/types';
import { applyAll } from '../utilities.js';

// Should set these up as null initially, then add an object to the key with the error, containing the error message.
const init = {
  tournaments: null,
  players: null,
  games: null
};


export default (state = init, action) => {
  switch (action.type) {
  case SET_ERRORED:
    return applyAll(state, action);
  default:
    return state;
  }
};
