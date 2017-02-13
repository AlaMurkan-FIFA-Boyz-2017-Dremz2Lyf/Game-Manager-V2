import { SELECT_TAB } from './types.js';

export const selectTab = (newTab) => {
  return {
    type: SELECT_TAB,
    payload: newTab
  };
};
