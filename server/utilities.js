/*
  createGames is a function that accepts two arguments
    - players: a list of all the players to be created <Array>
    - tournament: a number representing the tournament the games will be affiliated with. <Number>
*/
exports.createGames = (players, tournament, rounds = 1) => {

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
exports.applyRounds = (gamesArray, rounds) => {
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

exports.createTable = (players, games) => {

  let trackedStats = {
    wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, points: 0, goalDiff: 0,
  };

  let table = games.reduce((table, game) => {

    let { p1, p2 } = game;

    table[p1] = table[p1] ? table[p1] : Object.assign({}, trackedStats, {id: p1}, {poss: [], passAcc: []});
    table[p2] = table[p2] ? table[p2] : Object.assign({}, trackedStats, {id: p2}, {poss: [], passAcc: []});

    return exports.applyGame(table, game);
  }, {});

  players.forEach(player => {
    let { id, username } = player;
    if (table[id]) {
      table[id].username = username;
    }
  });

  return table;
};

exports.applyGame = (table, game) => {

  let { p1, p2, p1Score, p2Score, p1Shots, p2Shots, p1Poss, p2Poss, p1OnGoal, p2OnGoal, p1Reds, p1Yellows, p2Reds, p2Yellows, p1PassAcc, p2PassAcc } = game;

  let player1 = table[p1];
  let player2 = table[p2];

  if (p1Score && p2Score) {

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

exports.envStaticPath = (env) => (
  env === 'production' ? 'public' : 'devPublic'
);
