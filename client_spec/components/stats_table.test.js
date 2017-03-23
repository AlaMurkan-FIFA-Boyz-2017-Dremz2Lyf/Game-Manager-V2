import React from 'react';

import { StatsTable, mapStateToProps } from '../../client/components/stats_table';
import { normalize } from '../../client/utilities';

describe('Stats Table', () => {
  let mockPlayers = normalize(mockData.players.slice(0));
  let wrapper = shallow(<StatsTable players={mockPlayers}/>);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a list of players with their stats based on props', () => {
    expect(wrapper.find('tr').length).toBe(4);
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
});
