// dependancies
import axios from 'axios';

// Action Types
import { SET_ERRORED, SET_LOADING, RECEIVE, FETCH } from './types';

// Utilities
import { normalize } from '../utilities';

export const setErrored = (stateKey, data) => {

  let error = {status: data.status, message: data.data};

  return {
    type: SET_ERRORED,
    payload: {
      data: error,
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
    let error = new TypeError('Second argument passed to "receive" action should be an array', 'actions/index.js', 31);
    return dispatch => dispatch(setErrored(stateKey, error));
  }

  return {
    type: RECEIVE,
    payload: {
      data: normalize(data),
      stateKey
    }
  };
};

export const fetch = (stateKey, data = {}) => {
  let request = axios.get(`/${stateKey}`, {params: data});

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return request.then(response => response.data).then(data => {
      dispatch(receive(stateKey, data));
    }).catch(error => {
      let data = error.response;
      dispatch(setErrored(stateKey, data));
    }).then(dis => {
      dispatch(setLoading(stateKey, false));
    });
  };
};

export const create = (stateKey, data) => {
  let post = axios.post(`/${stateKey}`, data);

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return post.then(response => response.data.id).then(id =>
      dispatch(fetch(stateKey, {id}))
    ).catch(error => {
      let data = error.response;
      dispatch(setErrored(stateKey, data));
      dispatch(setLoading(stateKey, false));
    });
  };
};

export const update = (stateKey, data, params = {}) => {
  let put = axios.put(`/${stateKey}`, data);

  return dispatch => {
    dispatch(setLoading(stateKey, true));

    return put.then(response => response.data.id).then(id =>
      dispatch(fetch(stateKey, {id}))
    ).catch(error => {
      let data = error.response;
      dispatch(setErrored(stateKey, data));
      dispatch(setLoading(stateKey, false));
    });
  };
};
