import { SET_LOADING } from '../actions/types';
import { applyPayload } from '../utilities';

const init = {
  tournaments: false,
  players: false,
  games: false
};

export default (state = init, action) => {
  switch (action.type) {
  case SET_LOADING:
    return applyPayload(state, action);
  default:
    return state;
  }
};
