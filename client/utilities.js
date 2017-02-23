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
