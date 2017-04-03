import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';
import { normalize } from '../../client/utilities';

import { mockData } from '../mockData';

import { PlayTournament, mapStateToProps } from '../../client/components/play_tournament';

describe('PlayTournament Component', () => {
  let mockFetch = jest.fn();
  let mockReceive = jest.fn();
  let games = normalize(mockData.games.slice(0, 3));
  let players = normalize(mockData.players.slice(0, 3));
  let wrapper = shallow(
    <PlayTournament
      params={{id: '1'}}
      fetch={mockFetch}
      games={games}
      players={players}
    />
  );
  let mounted = mount(
    <Provider store={store}>
      <PlayTournament
        params={{id: '1'}}
        receive={mockReceive}
        fetch={mockFetch}
      />
    </Provider>
  );

  test('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  test('should call fetch for games and tournaments when mounted', () => {
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]).toEqual(['games', {type: 'tournament', id: '1'}]);
    expect(mockFetch.mock.calls[1]).toEqual(['tournaments', {id: '1'}]);
    mockFetch.mockClear();
  });

  test('should clear the games when unmounted', () => {
    mounted.unmount();

    expect(mockReceive).toHaveBeenCalled();
    expect(mockReceive.mock.calls[0]).toEqual(['games', []]);
    mockReceive.mockClear();
  });

});
