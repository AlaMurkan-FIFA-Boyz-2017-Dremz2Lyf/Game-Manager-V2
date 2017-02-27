// dependancies
import axios from 'axios';

// Action Types
import { SET_ERRORED, SET_LOADING, RECEIVE, FETCH } from './types';

// Utilities
import { normalize } from '../utilities';

export const setErrored = (stateKey, data) => {

  return {
    type: SET_ERRORED,
    payload: {
      data,
      stateKey
    }
  };
};

export const setLoading = (stateKey, data) => {
  return {
    type: SET_LOADING,
    payload: {
      data,
      stateKey
    }
  };
};

export const receive = (stateKey, data) => {
  if (!Array.isArray(data)) {
    throw new TypeError('data argument should be an array', 'actions/index.js', 31);
  }
  return {
    type: RECEIVE,
    payload: {
      data: normalize(data),
      stateKey
    }
  };
};

export const fetch = (stateKey, params = {}) => {

  let request = axios.get(`/${stateKey}`, params);

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return request.then(response => response.data).then(data =>
      dispatch(receive(stateKey, data))
    ).then(dis =>
      dispatch(setLoading(stateKey, false))
    ).catch(error => {
      throw error;
    });
  };
};

export const create = (stateKey, data, params = {}) => {
  let post = axios.post(`/${stateKey}`, data);

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return post.then(response => response.data.id).then(id => {
      dispatch(fetch(stateKey, {id}));
      return id;
    }).catch(error => { console.log('this', error); throw error; });
  };
};

export const update = (stateKey, data, params = {}) => {
  let put = axios.put(`/${stateKey}`, data);

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return put.then(response => response.data.id).then(id =>
      dispatch(fetch(stateKey, {id}))
    ).catch(error => { throw error; });
  };
};
