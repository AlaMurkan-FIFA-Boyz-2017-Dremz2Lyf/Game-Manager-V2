
exports.createGame = (players, tournamentId) => {

  if (!Array.isArray(players) || players.length !== 2) {
    throw new TypeError('createGame\'s first argument must be an Array with two playerIds');
  }
  // else {
  //   if (typeof players[0] === 'string') {
  //     Number.
  //     throw new TypeError('createGame\'s player ids must be numbers');
  //   }
  // }

  if (typeof tournamentId !== 'number') {
    throw new TypeError('createGame\'s second argument must be a number');
  }

  return {p1: players[0], p2: players[0], tournamentId: tournamentId};
};
