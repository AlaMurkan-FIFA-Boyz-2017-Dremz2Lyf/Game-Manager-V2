/*
  createGames is a function that accepts two arguments
    - players: a list of all the players to be created <Array>
    - tournament: a number representing the tournament the games will be affiliated with. <Number>
*/
exports.createGames = (players, tournament, rounds) => {

  // Handle validation for the first argument here.
  if (!Array.isArray(players)) {
    throw new TypeError('createGames\' first argument must be an array.', 'utilities.js', 6);
  }

  // Handle validation for the second argument next.
  if (typeof tournament !== 'number') {
    throw new TypeError('createGames\' second argument must be a number', 'utilities.js', 6);
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
        throw new TypeError('Items in the array passed to createGames should be numbers', 'utilities.js', 6);
      } else {
        let game = {p1, p2};

        // Set a tournament on the game and push it into the games array.
        game.tournament = tournament;
        games.push(game);
      }
    });
  }

  // applyRounds and return the resulting games array once it is all finished.

  return exports.applyRounds(games, rounds);
};

exports.formatName = (string) => {
  // Handle validation here
  if (typeof string !== 'string') {
    throw new TypeError('input must be a string', 'utilities.js', 49);
  }
  // then take care of the actual formatting here and return it. Capitalize the first letter of the string, and every other letter to lowercase.
  return string.split('').map((char, index) => (
    index === 0 ? char.toUpperCase() : char.toLowerCase()
  )).join('');
};


// ApplyRounds takes the build games array and creates duplicates for the number of rounds asked.
exports.applyRounds = (gamesArray, rounds = 1) => {
  // combined starts as the input array of games
  let combined = gamesArray;

  // for the number of rounds passed in, add the games array to the combined holder
    // and let combined be that result.
  for (let i = 1; i < rounds; i++) {
    combined = combined.concat(gamesArray);
  }

  // return the result
  return combined;
};
