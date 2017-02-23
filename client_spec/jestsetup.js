//create global enzyme functions for us in all test files
import { shallow, render, mount } from 'enzyme';

const path = require('path');

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.__client = path.join(__dirname, '../client');
global.__components = path.join(__dirname, '../client/components');
global.__reducers = path.join(__dirname, '../client/reducers');
global.__actions = path.join(__dirname, '../client/actions');

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
  {id: 1, username: 'Alice', createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, username: 'Gilbert', createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 3, username: 'Bob', createdAt: '2016-12-25T19:31:48', updatedAt: null}
];

// set a tournaments key on the mock database
mockData.tournaments = [
  {id: 1, name: 'Super Tourney!', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 2, name: 'new', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 3, name: 'next', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 4, name: 'hot', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null},
  {id: 5, name: 'fun', winner: null, createdAt: '2016-12-25T19:31:48', updatedAt: null}
];
// set a games key on the mock database
mockData.games = [
  {id: 1, p1: 1, p2: 2, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', createdAt: mockData.createdAt, updatedAt: null},
  {id: 2, p1: 1, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', createdAt: mockData.createdAt, updatedAt: null},
  {id: 3, p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 1, status: 'created', createdAt: mockData.createdAt, updatedAt: null}
];

mockData.newGame = {id: 4, p1: 2, p2: 3, p1Score: null, p2Score: null, p1Shots: null, p2Shots: null, p1Poss: null, p2Poss: null, p1OnGoal: null, p2OnGoal: null, tournament: 2, status: 'created', createdAt: mockData.createdAt, updatedAt: null};


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

// setup our test routes and methods
mock.onGet('/test').reply((config) => {
  if (!config.params) {
    return [200, mockData.test.existing];
  } else if (config.params.id === 1) {
    return [200, mockData.test.existing[0]];
  } else if (config.params.id === 3) {
    return [200, mockData.test.existing[2]];
  } else if (Array.isArray(config.params.id)) {
    return [200, mockData.test.existing.slice(0, 2)];
  }
})
.onPost('/test').reply(201, 'Created')
.onPut('/test').reply((config) => {
  return [202, {id: 1}];
});

mock.onGet('/games').reply((config) => config.id ? (
    config.id === 4 ? [200, [mockData.newGame]] : [200, [mockData.updated]]) : ([200, mockData.games])
  )
  .onPost('/games').reply(() => [202, {id: 4}])
  .onPut('/games').reply((config) => {
    mockData.updated = JSON.parse(config.data);
    return [201, {id: 1}];
  });

mock.onGet('/tournaments').reply(() => [200, mockData.tournaments])
  .onPost('/tournaments').reply(() => [201, 'Created'])
  .onPut('/tournaments').reply(() => [202, {id: 1}]);

mock.onGet('/players').reply(() => [200, mockData.players])
  .onPost('/players').reply(() => [201, 'Created'])
  .onPut('/players').reply(() => [202, {id: 1}]);

mock.onGet('/totally not a valid endpoint').reply(() => [404, 'shits fucked']);
