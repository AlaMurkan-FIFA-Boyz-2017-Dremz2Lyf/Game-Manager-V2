//create global enzyme functions for us in all test files
import { shallow, render, mount } from 'enzyme';

const path = require('path');

global.shallow = shallow;
global.render = render;
global.mount = mount;

//Mock Data for our axios mocks
global.mockData = {};

// Create a fake date to standardize createdAt and updatedAt values through tests
mockData.createdAt = '2016-12-25T19:31:48';
mockData.updatedAt = '2016-12-26T19:31:48';


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
    },
    {
      id: 3,
      laborum: 'Ea est officia laborum elit ut amet id',
      veniam: 'Duis irure eu laborum amet duis.'
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
mockData.players = [
  {id: 1, username: 'Alice', wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, possession: 0, isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, username: 'Gilbert', wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, possession: 0, isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 3, username: 'Bob', wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, shots: 0, onGoal: 0, reds: 0, yellows: 0, possession: 0, isTeam: 0, createdAt: '2016-12-25T19:31:48', updatedAt: null}
];

// set a tournaments key on the mock database
mockData.tournaments = [
  {id: 1, gamesPlayed: 0, totalGames: 3, name: 'Super Tourney!', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, gamesPlayed: 1, totalGames: 1, name: 'new', winner: 2, createdAt: '2016-12-25T19:31:48', updatedAt: mockData.updatedAt},
  {id: 3, gamesPlayed: 5, totalGames: 5, name: 'next', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 4, gamesPlayed: 1, totalGames: 7, name: 'hot', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 5, gamesPlayed: 2, totalGames: 6, name: 'fun', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null}
];
// set a games key on the mock database
mockData.games = [
  {id: 1, p1: 1, p2: 2, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null,
    p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', p1Reds: 0, p1Yellows: 0, p2Reds: 0, p2Yellows: 0, createdAt: mockData.createdAt, updatedAt: null},
  {id: 2, p1: 1, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null,
    p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', p1Reds: 0, p1Yellows: 0, p2Reds: 0, p2Yellows: 0, createdAt: mockData.createdAt, updatedAt: null},
  {id: 3, p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null,
    p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', p1Reds: 0, p1Yellows: 0, p2Reds: 0, p2Yellows: 0, createdAt: mockData.createdAt, updatedAt: null},
  {id: 4, p1: 2, p2: 3, p1Score: 2, p2Score: 1, p1Shots: 5, p2Shots: 6, p1Poss: 50,
    p2Poss: 50, p1OnGoal: 1, p2OnGoal: 3, tournament: 2, status: 'finished', p1Reds: 0, p1Yellows: 0, p2Reds: 0, p2Yellows: 0, createdAt: mockData.createdAt, updatedAt: mockData.updatedAt}
];

mockData.newGame = {
  id: 4, p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null,
  p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 2, status: 'created', p1Reds: 0, p1Yellows: 0, p2Reds: 0, p2Yellows: 0, createdAt: mockData.createdAt, updatedAt: null};


//Skip createElement warnings but fail tests on other warnings
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};

mockData.updated;

// NOTE: Axios is required here to pass it to the mock adapter function.
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This lets us test our axios requests easily.
let mock = new MockAdapter(axios);

// setup our routes and methods
mock.onGet('/games').reply((config) => {
  if (config.params.type && config.params.type === 'tournament') {
    return [200, mockData.games.filter(game => game.tournament === config.params.id)];
  } else {
    return config.params.id ? (
      config.params.id === 4 ? [200, [mockData.newGame]] : [200, [mockData.updated]]) : ([200, mockData.games]);
  }
})
.onPost('/games').reply(() => [202, [mockData.newGame]])
.onPut('/games').reply((config) => {
  mockData.updated = JSON.parse(config.data);

  return [201, [mockData.updated]];
});

mock.onGet('/tournaments').reply((config) => {
  if (config.params.rando === 'somethingInvalid') {
    return [400, 'Bad request'];
  }
})
.onPost('/tournaments').reply((config) => {
  if (config.data === 'somethingInvalid') {
    return [400, 'Bad request'];
  }
})
.onPut('/tournaments').reply((config) => {
  if (config.data === 'somethingInvalid') {
    return [400, 'Bad request'];
  }
});
