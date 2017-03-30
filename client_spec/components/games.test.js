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

});
