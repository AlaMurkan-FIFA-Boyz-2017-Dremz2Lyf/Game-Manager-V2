import React from 'react';
import { Home } from '../../client/components/home';


describe('Home Component', () => {
  let wrapper = shallow(<Home/>);

  test('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });


  test('should render a Grid layout with one row & two columns', () => {
    let row = wrapper.find('Row').length;
    let col = wrapper.find('Col').length;

    expect(row).toBe(1);
    expect(col).toBe(2);
  });

});
