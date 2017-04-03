// dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Initialize the router.
const routes = express.Router();

// Require the routes
const games = require('./routes/games');
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');
const table = require('./routes/table');
const wildcard = require('./routes/wildcard');

// Normalized path for our public/static files
const PUBLIC = path.normalize(__dirname + '/../public');

// And give them to our middleware with express.static
routes.use(express.static(PUBLIC));

// drop in some bodyParser here.
routes.use(bodyParser.json());

// and set up the route handlers here.
routes.use('/games', games);
routes.use('/players', players);
routes.use('/table', table);
routes.use('/tournaments', tournaments);
routes.use('*', wildcard);

if (process.env.NODE_ENV !== 'test') {
  // if we are not running tests, create our server, and start listening.

  const port = process.env.PORT || 4040;

  app.use('/', routes);

  const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
  });

} else {
  // If we are testing, make the routes exportable, so we can set up a test server during the tests.
  module.exports = routes;
}
