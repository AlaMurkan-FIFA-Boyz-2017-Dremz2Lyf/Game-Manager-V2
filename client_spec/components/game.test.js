import React from 'react';

import { Game, mapStateToProps } from '../../client/components/game';
import { normalize } from '../../client/utilities';

describe('Game Component', () => {
  let mockUpdate = jest.fn();
  let wrapper = shallow(
    <Game
      players={normalize(mockData.players)}
      game={mockData.games.slice(1, 2)[0]}
    />
  );

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should open the game modal when clicked', () => {
    expect(wrapper.state('showModal')).toBe(false);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('ListGroupItem').simulate('click');

    expect(wrapper.state('showModal')).toBe(true);
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({showModal: false});
  });

  it('should close the modal on "hide"', () => {
    wrapper.setState({showModal: true});

    let modal = wrapper.find('Modal');
    expect(modal.length).toBe(1);

    modal.simulate('hide');
    expect(wrapper.state('showModal')).toBe(false);
  });

  it('should mapStateToProps', () => {
    let state = {
      data: {
        players: {}
      }
    };
    let props = mapStateToProps(state);

    expect(props).toEqual({players: {}});
  });

});
