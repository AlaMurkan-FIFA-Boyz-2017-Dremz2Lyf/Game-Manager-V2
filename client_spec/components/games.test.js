import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';

import { Games } from '../../client/components/games';

describe('Games Component', () => {
  let mockFetch = jest.fn();
  let mockUpdate = jest.fn();
  let wrapper = shallow(
    <Games
      tournament={'1'}
      games={mockData.games.slice(0, 3)}
      update={mockUpdate}
    />
  );

  let mounted = mount(
    <Provider store={store}>
      <Games
        tournament={'1'}
        fetch={mockFetch}
      />
    </Provider>
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

  test('should call fetch when it\'s mounted', () => {

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]).toEqual(['games', {type: 'tournament', id: '1'}]);
  });

});
