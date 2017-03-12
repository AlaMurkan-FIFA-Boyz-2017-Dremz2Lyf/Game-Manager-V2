export const normalize = (responseBody) => {

  return responseBody.reduce((normalized, item) => {
    normalized[item.id] = item;
    return normalized;
  }, {});

};

export const applyPayload = (state, action) => {
  const { stateKey, data } = action.payload;

  return {...state, [stateKey]: data};
};

export const percentPlayed = (gamesPlayed, totalGames) => {
  return Math.floor((gamesPlayed / totalGames) * 100);
};

export const getValidationState = (valid, pristine) => pristine ? null : (valid ? 'success' : 'error' );
