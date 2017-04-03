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



//
// Helper Functions
//
// This is the object you can attach any helper functions used across
// several test files.
global.TestHelper = {};
// This is the object to create the mock database.
// It should contain keys representing tables in the db.
// Those keys should point to arrays holding objects or 'rows' back from the DB
global.mockData = {};

// Create a fake date to standardize createdAt and updatedAt values through tests
TestHelper.createdAt = '2016-12-25T19:31:48';
TestHelper.updatedAt = '2016-12-26T19:31:48';


mockData.test = [
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
];


// set a players key on the mock database
mockData.players = [
  {id: 1, username: 'Alice', isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, username: 'Gilbert', isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 3, username: 'Bob', isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null}
];

// set a tournaments key on the mock database
mockData.tournaments = [
  {id: 1, gamesPlayed: 0, totalGames: 3, name: 'Super Tourney!', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, gamesPlayed: 1, totalGames: 6, name: '2 Rounds', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null}
];
// set a games key on the mock database
mockData.games = [
  {
    id: 1,
    p1: 1, p2: 2,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 1, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 2,
    p1: 1, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 1, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 3,
    p1: 2, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 1, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 4,
    p1: 1, p2: 2,
    p1Score: 3, p2Score: 2,
    p1Shots: 6, p2Shots: 10,
    p1Poss: 55, p2Poss: 45,
    p1OnGoal: 5, p2OnGoal: 6,
    tournament: 2, status: 'finished',
    p1Reds: 0, p1Yellows: 1, p2Reds: 0, p2Yellows: 2,
    createdAt: TestHelper.createdAt, updatedAt: TestHelper.updatedAt
  },
  {
    id: 5,
    p1: 1, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 2, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 6,
    p1: 2, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 2, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 7,
    p1: 1, p2: 2,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 2, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 8,
    p1: 1, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 2, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  },
  {
    id: 9,
    p1: 2, p2: 3,
    p1Score: null, p2Score: null,
    p1Shots: null, p2Shots: null,
    p1Poss: null, p2Poss: null,
    p1OnGoal: null, p2OnGoal: null,
    tournament: 2, status: 'created',
    p1Reds: null, p1Yellows: null, p2Reds: null, p2Yellows: null,
    createdAt: TestHelper.createdAt, updatedAt: null
  }
];


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

TestHelper.checkForHtml = (text) => text.slice(0, 6) === '<html>';

//
// Mocha "helpers" to support coroutines tests
//
var Bluebird = require('bluebird');

global.before_ = function (f) { before ( Bluebird.coroutine(f) ); };
global.beforeEach_ = function (f) { beforeEach ( Bluebird.coroutine(f) ); };
global.it_ = function (description, f) { it ( description, Bluebird.coroutine(f) ); };
global.xit_ = function (description, f) { xit ( description, f ); };
global.it_.only = function (description, f) { it.only( description, Bluebird.coroutine(f) ); };
