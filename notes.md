# Testing

/tests/containers/Root.spec.js

`import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
import Root from '../../src/containers/Root';  // import our soon to be component

describe('(Container) Root', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper.type()).to.eql('div');
  });

  it('has style with height 100%', () => {
    const wrapper = shallow(<Root />);
    const expectedStyles = {
      height: '100%',
      background: '#333'
    }
    expect(wrapper.prop('style')).to.eql(expectedStyles);
  });

  it('contains a header explaining the app', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper.find('.welcome-header')).to.have.length(1);
  });
});`

## testing root reducer

`let store = createStore(rootReducer)

// check that initial state of the root reducer matches
// what child reducers return given an empty action

expect(store.getState().counter).toEqual(counter(undefined, {}))
expect(store.getState().todos).toEqual(todos(undefined, {}))

// alternatively you can test values explicitly although this
// couples this test to child reducer impl details:

expect(store.getState().counter).toEqual(0)
expect(store.getState().todos).toEqual([])

// now you can do a similar “smoke test” to check
// that child reducers handle an action

let action = { type: 'INCREMENT' }
store.dispatch(action)
expect(store.getState().counter).toEqual(counter(undefined, action))
expect(store.getState().todos).toEqual(todos(undefined, action))

// alternatively you can test values explicitly although this
// couples this test to child reducer impl details:

expect(store.getState().counter).toEqual(1)
expect(store.getState().todos).toEqual([])`



# Actions

## Attempt at dry Actions!

- `FETCH_GAMES` handles the async actions
  - accepts a tournament id for the request
  - dispatch `SET_LOADING` for `games` with `true`
  - sends off the `get` request to the server for games of that tournament
    - `.then` dispatch `RECEIVE_GAMES` with the games as the payload
    - `.catch` dispatch `SET_ERROR` for `games` with `true`
- `RECEIVE_GAMES`
    - dispatch `SET_LOADING` for `games` with `false`
    - sends payload through to reducer, adding them to state
- `POST_GAME`
  - sends off the `post` request to the server with the specific game
    - `.then` dispatch `FETCH_GAMES`
    - `.catch` dispatch `SET_ERROR` for `gamesPost` with `true`



# Store design


store = {
  isLoading: {
    tournaments: false,
    games: false,
    players: false
  },
  isError: {
    tournaments: false,
    games: false,
    players: false
  },
  data: {
    tournaments: {
      1: {},
      ...
    },
    players: {
      1: {},
      ...
    },
    games: {
      1: {},
      ...
    }
  },
  createForm: reduxForm,
  newPlayer: reduxForm
}


## Track tournament progress

  require's a column for total games, and games played.

  put to `/tournaments` include gamesFinished <Number>
  post to `/tournaments` needs to wait for the games to be made, to have the total number.
    then include gameCount <Number>