import React from 'react';

import PlayerListItem from '../../client/components/player_list_item';

import { mockData } from '../mockData';

describe('PlayerListItem', () => {
  let alice = {...mockData.players[0]};
  let moveMock = jest.fn();
  let wrapper = shallow(<PlayerListItem move={moveMock} player={alice}/>);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the appropriate player', () => {

    expect(wrapper.contains(<span>Alice</span>)).toBe(true);
  });

  test('should pass the id to the move function', () => {
    wrapper.find('ListGroupItem').simulate('click');

    expect(moveMock.mock.calls[0]).toEqual(['1']);
    moveMock.mockClear();
  });

});
