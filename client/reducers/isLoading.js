import { SET_LOADING } from '../actions/types';
import { applyAll } from '../utilities';

const init = {
  tournaments: false,
  players: false,
  games: false
};

export default (state = init, action) => {
  switch (action.type) {
  case SET_LOADING:
    return applyAll(state, action);
  default:
    return state;
  }
};
