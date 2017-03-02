export const normalize = (requestBody) => {

  return requestBody.reduce((normalized, item) => {
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
