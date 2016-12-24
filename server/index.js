const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const routes = express.Router();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());


if (process.env.NODE_ENV !== 'test') {
  
  const port = process.env.PORT || 4040;

  const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
  });

} else {
  module.exports = routes;
}
