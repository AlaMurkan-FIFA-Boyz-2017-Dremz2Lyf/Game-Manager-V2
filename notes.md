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

## Games Actions

- `FETCH_GAMES` handles the async actions
  - accepts a tournament id for the request
  - dispatch `REQUEST_GAMES`
  - sends off the `get` request to the server for games of that tournament
    - `.then` dispatch `RECEIVE_GAMES` with the games as the payload
    - `.catch` dispatch `ERROR`
- `POST_GAME`
  - sends off the `post` request to the server with the specific game
    - `.then` dispatch `FETCH_GAMES`
    - `.catch` dispatch `ERROR`
- `REQUEST_GAMES`
  - Sets the `waiting` key in state to `true`
- `RECEIVE_GAMES`
  - Sets `waiting` to `false`
  - sends payload through to reducer, adding them to state
- `ERROR`
  - Sets `error` to `true`
  - should probably accept an argument based on what async action failed.

## Tournaments Actions

- `FETCH_TOURNAMENTS`
  - dispatch `REQUEST_TOURNAMENTS`
  - send `get` request to server for all tournaments
- `REQUEST_TOURNAMENTS`
  - sets `waiting` to `true`
- `RECEIVE_TOURNAMENTS`
  - sets `waiting` to `false`
  - sends payload through to reducer, adding them to state
- `POST_TOURNAMENTS`
  - sends `post` request to the server for specific tournament
    - `.then` dispatch `FETCH_TOURNAMENTS`
    - `.catch` dispatch `ERROR`
- `ERROR`
  - sets `error` to `true`
  - also should accept an argument based on what failed.
