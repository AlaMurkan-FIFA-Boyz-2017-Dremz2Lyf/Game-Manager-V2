import React from 'react';

import { Game, mapStateToProps } from '../../client/components/game';
import { normalize } from '../../client/utilities';

describe('Game Component', () => {
  let mockUpdate = jest.fn();
  let mockGame = mockData.games.slice(1, 2)[0];
  let wrapper = shallow(
    <Game
      players={normalize(mockData.players)}
      game={mockGame}
      tournaments={mockData.tournaments.slice(0)}
      update={mockUpdate}
    />
  );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  test('should open the game modal when clicked', () => {
    expect(wrapper.state('showModal')).toBe(false);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('ListGroupItem').simulate('click');

    expect(wrapper.state('showModal')).toBe(true);
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({showModal: false});
  });

  test('should close the modal on "hide"', () => {
    wrapper.setState({showModal: true});

    let modal = wrapper.find('Modal');
    expect(modal.length).toBe(1);

    modal.simulate('hide');
    expect(wrapper.state('showModal')).toBe(false);
  });

  test('should mapStateToProps', () => {
    let state = {
      data: {
        players: {}
      }
    };
    let props = mapStateToProps(state);

    expect(props).toEqual({players: {}});
  });

  test('should handle the submit properly', () => {
    // Open the modal so the form is there to actually submit
    wrapper.setState({showModal: true});

    // Find the ReduxForm and simulate a submit event on it.
    wrapper.find('ReduxForm').simulate('submit');

    // expect the mockUpdate to have been called
    expect(mockUpdate).toHaveBeenCalled();
    // expect the correct values to have been passed to the mock
      // we do not simulate any change events for input, because those are handled by redux-form, and we trust that library has done the testing of that.
    expect(mockUpdate.mock.calls[0]).toEqual(['tournaments', {id: 1, gamesPlayed: 2}]);
    expect(mockUpdate.mock.calls[1]).toEqual(['games', {id: 2, status: 'finished'}]);
    // and finally we expect the modal to have been hidden.
    expect(wrapper.state().showModal).toBe(false);

    // clear up the mock for further tests
    mockUpdate.mockClear();
  });

  test('should not update gamesPlayed if the game has already been submitted', () => {
    // again, open the model
    wrapper.setState({showModal: true});

    // simulate that our game has already been played
    mockGame.p1Score = 1;
    mockGame.p2Score = 3;

    wrapper.setProps({game: mockGame});

    // and simulate our submit
    wrapper.find('ReduxForm').simulate('submit');
    expect(mockUpdate.mock.calls[0]).toEqual(['games', {id: 2, status: 'finished'}]);

    // clear up the mock for further tests
    mockUpdate.mockClear();
  });

});
