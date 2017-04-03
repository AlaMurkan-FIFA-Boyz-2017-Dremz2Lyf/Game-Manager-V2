import React from 'react';

import { StatsTable, mapTableToProps } from '../../client/components/stats_table';
import { normalize } from '../../client/utilities';

import { mockData } from '../mockData';

describe('Stats Table', () => {
  let mockTable = {...mockData.table};
  let tableHeaders = ['Player', 'P', 'W', 'L', 'D', 'GF', 'GA', 'GD', 'S', 'OT', 'Y', 'R', 'Po'];
  let wrapper = shallow(<StatsTable table={mockTable} headers={tableHeaders}/>);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a list of players with their stats based on props', () => {
    expect(wrapper.find('StatsTableRow').length).toBe(3);
  });

  test('should mapStateToProps', () => {
    let state = {
      data: {
        allTime: {}
      }
    };
    let props = mapTableToProps(state);

    expect(props).toEqual({table: {}});
  });
});
