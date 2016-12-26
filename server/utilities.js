
exports.createGame = (p1, p2) => {

  if (typeof p1 !== 'number' || typeof p1 !== 'number') {
    throw new TypeError('createGame accepts two numbers represeting the playerIds for the game to be made', 'utilities.js', 2);
  }

  let createdAt = new Date().toISOString();

  return {p1: p1, p2: p2, createdAt: createdAt};
};

/*
  createGames is a function that accepts two arguments
    - players: a list of all the players to be created <Array>
    - tournamentId: a number representing the tournament the games will be affiliated with. <Number>
*/
exports.createGames = (players, tournamentId) => {
  if (!Array.isArray(players)) {
    throw new TypeError('createGames\' first argument must be an array.', 'utilities.js', 18);
  }

  if (typeof tournamentId !== 'number') {
    throw new TypeError('createGames\' second argument must be a number', 'utilities.js', 18);
  }

  // Make a copy of the input array.
  let list = players.slice();

  let games = [];

  while (list.length > 0) {

    let p1 = list.pop();

    list.forEach(p2 => {
      if (typeof p2 !== 'number' || typeof p1 !== 'number') {
        throw new TypeError('Items in the array passed to createGames should be numbers', 'utilities.js', 18);
      } else {
        let game = this.createGame(p1, p2);

        game.tournamentId = tournamentId;
        games.push(game);
      }

    });
  }

  return games;
};
