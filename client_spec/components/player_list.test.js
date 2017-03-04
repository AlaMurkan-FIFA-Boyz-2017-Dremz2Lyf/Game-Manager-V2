import React from 'react';
import { Provider } from 'react-redux';

import PlayerList from '../../client/components/player_list';
import { store } from '../../client/store';


describe('PlayerList', () => {
  let mockMove = jest.fn();
  let wrapper = shallow( <PlayerList searchValue={''} all={false} move={mockMove}/> );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should not render the CreatePlayer component if all is false', () => {

    expect(wrapper.find('CreatePlayer').length).toBe(0);
  });

  test('should render Components correctly based on props', () => {

    expect(wrapper.find('CreatePlayer').length).toBe(0);
    expect(wrapper.find('PlayerListItem').length).toBe(0);

    wrapper.setProps({
      all: true,
      players: mockData.players
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Connect(CreatePlayer)').length).toBe(1);
    expect(wrapper.find('PlayerListItem').length).toBe(3);

  });


});
