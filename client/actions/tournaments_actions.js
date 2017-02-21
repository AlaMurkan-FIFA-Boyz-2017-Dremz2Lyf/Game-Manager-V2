import {
  TOURNAMENTS_ERROR,
  REQUEST_TOURNAMENTS,
  RECEIVE_TOURNAMENTS
} from './types';

export const tournamentsError = (type) => {
  return {
    type: TOURNAMENTS_ERROR,
    source: type
  };
};

export const requestTournaments = () => {
  return {
    type: REQUEST_TOURNAMENTS
  };
};

export const receiveTournaments = (tournaments) => {
  return {
    type: RECEIVE_TOURNAMENTS,
    tournaments
  };
};
