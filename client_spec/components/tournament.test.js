import React from 'react';
import { Tournament } from '../../client/components/tournament';


describe('Tournament component', () => {
  let wrapper = shallow(<Tournament />);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
