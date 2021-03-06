/**
  * normalize
  * @param {array} list - an array of objects to be normalized into an object
*/
export const normalize = (list) => {

  return list.reduce((normalized, item) => {
    normalized[item.id] = {...item};
    return normalized;
  }, {});

};

/**
  * applyAll - apply all uses a bit of tricky programming here to return a new state adding to only the specific substate we need.
  * @param {object} state - the current state
  * @param {object} action - the action coming through, it's payload must have a stateKey and the data corresponding to that statekey.
*/
export const applyAll = (state, action) => {
  const { stateKey, data } = action.payload;

  return {...state, [stateKey]: data};
};

/**
  * percentPlayed - basic math here.
  * @param {number} gamesPlayed - pretty self explanatory
  * @param {number} totalGames - pretty self explanatory
*/
export const percentPlayed = (gamesPlayed, totalGames) => {
  return Math.floor((gamesPlayed / totalGames) * 100);
};

/**
  * getValidationState - will give us the correct bootstrap class for UI responsiveness
  * @param {bool} valid - passed from redux-form, lets us know if the form is valid
  * @param {bool} pristine - from redux-form, lets us know if the form has been touched & edited
*/
export const getValidationState = (valid, pristine) => pristine ? null : (valid ? 'success' : 'error' );

/**
  * required - another validation check for redux-form
  * @param {string} value - from redux-form, returns an alert if the user has not entered required info. Also deals with the number 0 as that is falsey value.
*/
export const required = value => value === 0 || value ? undefined : 'Required';

/**
  * possValidation - validation specific to the possession field
  * @param {string} value - the input from the form
  * @param {string} allValues - all the inputs from the form
*/
export const possValidation = (value, allValues) => {
  const { p1Poss, p2Poss } = allValues;

  if (!p1Poss && !p2Poss) {
    return 'Possession is required.';
  } else if (Number(p1Poss) + Number(p2Poss) !== 100) {
    return 'Possession should add up to 100%!';
  }
  return undefined;
};

/**
  * helpMessage - renders the correct help message based on the field
  * @param {string} field
*/
export const helpMessage = (field) => {
  let message;

  if (field === 'Score') {
    message = `${field} is required! I mean.. come on!`;
  } else {
    message = `${field} will default to 0 if not given.`;
  }
  return message;
};

/**
  * buildTable
  * @param {object} games - a normalized games object to build the table from
  * @param {object} players - another normalized object to reference the player names.
*/
export const buildTable = (games, players) => {

  let trackedStats = {
    wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, points: 0, goalDiff: 0
  };

  return Object.keys(games).reduce((table, id) => {
    let game = games[id];
    let { p1, p2 } = game;

    table[p1] = table[p1] ? table[p1] : { ...trackedStats, id: p1, username: players[p1].username, poss: [], passAcc: []};
    table[p2] = table[p2] ? table[p2] : { ...trackedStats, id: p2, username: players[p2].username, poss: [], passAcc: []};

    return applyGame(table, game);
  }, {});
};


// I extracted this out of the reduce in build table because of all the action that needs to happen.
// There might be a more programmatic way to do this. Potentially mapping the game objects from the database into nested objects for each player in the game.... that would, in theory, allow us to just loop through each player's object from the game and apply them to the correct player.

/**
  * applyGame - used in buildTable to apply the game to the table
  * @param {object} table - the current table
  * @param {object} game - the current game to be applied
*/
export const applyGame = (table, game) => {

  let { p1, p2, p1Score, p2Score, p1Shots, p2Shots, p1Poss, p2Poss, p1OnGoal, p2OnGoal, p1Reds, p1Yellows, p2Reds, p2Yellows, p1PassAcc, p2PassAcc } = game;

  let player1 = table[p1];
  let player2 = table[p2];

  if (p1Score !== null && p2Score !== null) {

    p1Score === p2Score ? (
      player1.draws++,
      player2.draws++
    ) : p1Score > p2Score ? (
      player1.wins++,
      player2.losses++
    ) : (
      player2.wins++,
      player1.losses++
    );
    player1.goalsFor += p1Score;
    player2.goalsFor += p2Score;
    player1.goalsAgainst += p2Score;
    player2.goalsAgainst += p1Score;
    player1.shots += p1Shots;
    player2.shots += p2Shots;
    player1.onGoal += p1OnGoal;
    player2.onGoal += p2OnGoal;
    player1.reds += p1Reds;
    player2.reds += p2Reds;
    player1.yellows += p1Yellows;
    player2.yellows += p2Yellows;
    player1.poss.push(p1Poss);
    player2.poss.push(p2Poss);
    player1.passAcc.push(p1PassAcc);
    player2.passAcc.push(p2PassAcc);
    player1.points = (player1.wins * 3 + player1.draws);
    player2.points = (player2.wins * 3 + player2.draws);
    player1.goalDiff = (player1.goalsFor - player1.goalsAgainst);
    player2.goalDiff = (player2.goalsFor - player2.goalsAgainst);
  }
  return table;
};

/**
  * getAverage - used by StatsTableRow to get the average of all percentage based stats
  * @param {array} array - an array of percentages
*/
export const getAverage = (array) => {
  let count = array.length || 1;
  let average = array.reduce((total, current) => total += current, 0) / count;

  return Math.round(average * 100) / 100;
};

/**
  * getEnvBaseUrl - used to determine the base url for ajax requests;
  * @param {string} env - the process' environmental variable NODE_ENV
*/
export const getEnvBaseUrl = (env) => (
  env === 'production' ? window.location.origin : ''
);

/**
  * onlyNumbers - will return a number from a string, if it is not NaN;
  * @param {string} input - a string
*/
export const onlyNumbers = (input) => {
  let number = Number(input);
  return Number.isNaN(number) ? 0 : number;
};

/**
  * validPercentage - validates percentage inputs;
  * @param {string} value - a numberic value
*/
export const validPercentage = (value) => (
  value > 100 || value < 0 ? 'This should be a valid percentage' : undefined
);
