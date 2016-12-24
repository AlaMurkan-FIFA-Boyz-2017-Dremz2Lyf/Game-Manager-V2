// dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = express.Router();

// routes
const games = require('./routes/games');
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');


routes.use(express.static(path.join(__dirname, 'public')));

routes.use(bodyParser.json());

routes.use('/games', games);
routes.use('/players', players);
routes.use('/tournaments', tournaments);

if (process.env.NODE_ENV !== 'test') {

  const port = process.env.PORT || 4040;

  app.use('/', routes);

  const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
  });

} else {
  module.exports = routes;
}
