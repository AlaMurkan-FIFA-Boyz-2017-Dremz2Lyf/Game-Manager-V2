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

export const required = value => value ? undefined : 'Required';

export const possValidation = (value, allValues) => {
  const { p1Poss, p2Poss } = allValues;
  if (!p1Poss && !p2Poss) {
    return undefined;
  } else if (Number(p1Poss) + Number(p2Poss) !== 100) {
    return 'Possession should add up to 100%!';
  }
  return undefined;
};

export const helpMessage = (field) => {
  let message;

  if (field === 'Score') {
    message = `${field} is required! I mean.. come on! `;
  } else {
    message = `${field} will default to 0 if not given.`;
  }
  return message;
};
