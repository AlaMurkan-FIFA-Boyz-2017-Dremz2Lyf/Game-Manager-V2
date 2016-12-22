const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

const port = process.env.PORT || 4040;

const server = app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);

});
