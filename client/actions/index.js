// dependancies
import axios from 'axios';

// Action Types
import { SET_ERRORED, SET_LOADING, RECEIVE } from './types';

// Utilities
import { normalize } from '../utilities';

export const setErrored = (stateKey, data) => {
  // NOTE: Still not 100% sure if this is going to work for all errors.... but it might! :D
  let error = data.status ? {status: data.status, message: data.data} : {message: data.message, source: data.stack};

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
  // receive is set up to accept an array or an object.
    // If it is an array we do the normalization here.
  if (Array.isArray(data)) {
    data = normalize(data);
  }

  // and send off our action with the proper payload
  return {
    type: RECEIVE,
    payload: {
      data,
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
      // This should handle any response errors, but more than likely not anything else.... D:
      let data = error.response ? error.response : error;
      dispatch(setErrored(stateKey, data));
    }).then(dis => {
      dispatch(setLoading(stateKey, false));
    });
  };
};

// In an effort to minimize request traffic, the server will respond with the updated or created data object we are currently working with. Instead of fetching all of that corresponding data we need after the post. We will just pass the updated data through to the receive action, by using getState from redux-thunk.

export const create = (stateKey, data) => {
  let post = axios.post(`/${stateKey}`, data);

  return (dispatch, getState) => {
    dispatch(setLoading(stateKey, true));

    return post.then(response => normalize(response.data)).then(updated => {

      // Grab the specific subState for the stateKey we are working with during this action
      let subState = getState().data[stateKey];

      // Take the subState and the updated data and create a new object
      let updatedSubState = {...subState, ...updated};

      // Pass that updated subState into the receive action
      return dispatch(receive(stateKey, updatedSubState));
    }).catch(error => {

      // If there was an error in the put, we grab the response from the server and pass it along to our setErrored action creator.
      let data = error.response;
      return dispatch(setErrored(stateKey, data));
    }).then(dis =>

      // Once everything is done, we set our loading flag to false.
      dispatch(setLoading(stateKey, false))
    );
  };
};

export const update = (stateKey, data) => {
  let put = axios.put(`/${stateKey}`, data);

  return (dispatch, getState) => {
    // Set our loading flag for the specific stateKey we are working with
    dispatch(setLoading(stateKey, true));

    // Then handle the async request.
    return put.then(response => normalize(response.data)).then(updated => {

      // Grab the specific subState for the stateKey we are working with during this action
      let subState = getState().data[stateKey];

      // Take the subState and the updated data and create a new object
      let updatedSubState = {...subState, ...updated};

      // Pass that updated subState into the receive action
      return dispatch(receive(stateKey, updatedSubState));
    }).catch(error => {

      // If there was an error in the put, we grab the response from the server and pass it along to our setErrored action creator.

      let data = error.response;
      return dispatch(setErrored(stateKey, data));
    }).then(dis =>

      // Once everything is done, we set our loading flag to false.
      dispatch(setLoading(stateKey, false))
    );
  };
};
