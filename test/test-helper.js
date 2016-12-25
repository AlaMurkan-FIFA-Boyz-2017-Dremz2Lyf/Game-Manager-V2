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
  {name: 'Super Tourney!', winner: null}
];
// set a games key on the mock database
mockData.games = [
  {p1: 1, p2: 2, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created'},
  {p1: 1, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created'},
  {p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Possession: null, p2Possession: null, p1ShotsOnGoal: null, p2ShotsOnGoal: null, tournamentId: 1, status: 'created'}
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
