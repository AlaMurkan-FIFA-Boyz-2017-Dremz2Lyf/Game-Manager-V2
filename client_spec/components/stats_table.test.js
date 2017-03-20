import React from 'react';

import { StatsTable } from '../../client/components/stats_table';

describe('Stats Table', () => {
  let wrapper = shallow(<StatsTable/>);

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
