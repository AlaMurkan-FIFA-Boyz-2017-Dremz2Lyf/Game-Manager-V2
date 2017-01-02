/*
  createGames is a function that accepts two arguments
    - players: a list of all the players to be created <Array>
    - tournament: a number representing the tournament the games will be affiliated with. <Number>
*/
exports.createGames = (players, tournament) => {

  // Handle validation for the first argument here.
  if (!Array.isArray(players)) {
    throw new TypeError('createGames\' first argument must be an array.', 'utilities.js', 24);
  }

  // Handle validation for the second argument next.
  if (typeof tournament !== 'number') {
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
        let game = {p1: p1, p2: p2};

        // Set a tournament on the game and push it into the games array.
        game.tournament = tournament;
        games.push(game);
      }
    });
  }

  // Return the games array once it is all finished.
  return games;
};
