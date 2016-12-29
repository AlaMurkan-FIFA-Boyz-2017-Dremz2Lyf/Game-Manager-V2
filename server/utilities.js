/*
  createGame is a function that accepts two numbers.
  - These numbers represent playerIds <Number>
*/
exports.createGame = (p1, p2) => {

  // Throw an error if the arguments are not numbers
  if (typeof p1 !== 'number' || typeof p2 !== 'number') {
    throw new TypeError('createGame accepts two numbers represeting the playerIds for the game to be made', 'utilities.js', 5);
  }

  // add a createdAt date.
  let createdAt = new Date().toISOString().substring(0, 19);

  // return the game
  return {p1: p1, p2: p2, createdAt: createdAt};
};

/*
  createGames is a function that accepts two arguments
    - players: a list of all the players to be created <Array>
    - tournamentId: a number representing the tournament the games will be affiliated with. <Number>
*/
exports.createGames = (players, tournamentId) => {

  // Handle validation for the first argument here.
  if (!Array.isArray(players)) {
    throw new TypeError('createGames\' first argument must be an array.', 'utilities.js', 24);
  }

  // Handle validation for the second argument next.
  if (typeof tournamentId !== 'number') {
    throw new TypeError('createGames\' second argument must be a number', 'utilities.js', 24);
  }

  // Then make a copy of the input array.
  let list = players.slice();

  // Create a games array.
  let games = [];

  // While there is something in the copy of the players list,
  while (list.length > 0) {

    // grab the first player from it,
    let p1 = list.pop();

    // and go over each other player and create a game with those two players.
    list.forEach(p2 => {
      // handle some double check validation here.
      if (typeof p2 !== 'number' || typeof p1 !== 'number') {
        throw new TypeError('Items in the array passed to createGames should be numbers', 'utilities.js', 24);
      } else {
        let game = this.createGame(p1, p2);

        // Set a tournamentId on the game and push it into the games array.
        game.tournamentId = tournamentId;
        games.push(game);
      }
    });
  }

  // Return the games array once it is all finished.
  return games;
};
