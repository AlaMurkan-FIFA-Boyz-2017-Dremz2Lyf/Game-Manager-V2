process.env.NODE_ENV = 'test';
const path = require('path');
// The following allows you to require files independent of
// the location of your test file.
// Example:
//  var User = require(__server + '/models/user.js')
//

global.__server = path.join(__dirname, '../server');
global.__client = path.join(__dirname, '../client');

//
// Assertions
//
var chai = require('chai');
// Option 1: Make the `expect` function available in every test file
global.expect = chai.expect;
// Option 2: Make everything should-able
// global.should = chai.should()


// This is the object to create the mock database.
  // It should contain keys representing tables in the db.
  // Those keys should point to arrays holding objects or 'rows' back from the DB
global.mockData = {};

mockData.test = {
  existing: [
    {
      id: 1,
      laborum: 'officia proident duis in commodo',
      veniam: 'irure irure amet aliquip consectetur.'
    },
    {
      id: 2,
      laborum: 'Ea est eiusmod laborum elit ut amet id',
      veniam: 'Esse minim irure eu occaecat veniam duis.'
    }
  ],
  updated: [
    {
      id: 1,
      laborum: 'Updated info',
      veniam: 'Ya know it'
    }
  ]
};


// set a players key on the mock database
mockData.playerObjs = [
  {id: 1, username: 'Alice'},
  {id: 2, username: 'Gilbert'},
  {id: 3, username: 'Bob'}
];

// set a tournaments key on the mock database
mockData.tournaments = [
  {tournament_name: 'Super Tourney!', winner_id: null}
];
// set a games key on the mock database
mockData.games = [
  {player1_id: 1, player2_id: 2, player1_score: null, player2_score: null, player1_shots: null, player2_shots: null, player1_possession: null, player2_possession: null, player1_shotsOnGoal: null, player2_shotsOnGoal: null, tournament_id: 1, status: 'created'},
  {player1_id: 1, player2_id: 3, player1_score: null, player2_score: null, player1_shots: null, player2_shots: null, player1_possession: null, player2_possession: null, player1_shotsOnGoal: null, player2_shotsOnGoal: null, tournament_id: 1, status: 'created'},
  {player1_id: 2, player2_id: 3, player1_score: null, player2_score: null, player1_shots: null, player2_shots: null, player1_possession: null, player2_possession: null, player1_shotsOnGoal: null, player2_shotsOnGoal: null, tournament_id: 1, status: 'created'}
];


//
// Helper Functions
//
// This is the object you can attach any helper functions used across
// several test files.
global.TestHelper = {};

//
//
// Mock apps for API testing
//
var express = require('express');

TestHelper.createApp = function (loader) {
  var app = express();
  app.use(require('body-parser').json());

  app.testReady = function () {
    // Log all errors
    app.use(function (err, req, res, next) {
      console.error('==Error==');
      console.error('   ' + err.stack);
      next(err);
    });
  };
  return app;
};

TestHelper.checkForHtml = (text) => text.slice(0, 6);

//
// Mocha "helpers" to support coroutines tests
//
var Bluebird = require('bluebird');

global.before_ = function (f) { before ( Bluebird.coroutine(f) ); };
global.beforeEach_ = function (f) { beforeEach ( Bluebird.coroutine(f) ); };
global.it_ = function (description, f) { it ( description, Bluebird.coroutine(f) ); };
global.xit_ = function (description, f) { xit ( description, f ); };
global.it_.only = function (description, f) { it.only( description, Bluebird.coroutine(f) ); };
