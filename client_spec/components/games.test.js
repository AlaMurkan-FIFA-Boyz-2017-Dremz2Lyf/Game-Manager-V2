import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';

import { Games } from '../../client/components/games';

import { mockData } from '../mockData';

describe('Games Component', () => {
  let wrapper = shallow(
    <Games
      tournament={'1'}
      games={mockData.games.slice(0, 3)}
    />
  );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should not fail with no props', () => {
    let empty = shallow(<Games />);

    expect(empty).toMatchSnapshot();
  });

  test('should render a list of Game components', () => {

    expect(wrapper.find('Connect(Game)').length).toBe(3);
  });

  test('should control it\'s own state for the carousel', () => {
    // Expect our initial state to be correct
    expect(wrapper.state()).toEqual({index: 0, direction: null});

    // find the Carousel and simulate a select event on it... hopefully that's easy.......
    wrapper.find('Carousel').simulate('select', 1, {direction: 'next'});

    // Expect the state to have correctly changed.
    expect(wrapper.state()).toEqual({index: 1, direction: 'next'});
  });

});
