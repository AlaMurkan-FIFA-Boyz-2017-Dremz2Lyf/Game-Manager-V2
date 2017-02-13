import React from 'react';
import Home from '../../client/components/home';


describe('Home Component', () => {
  let wrapper;

  test('should match snapshot', () => {
    wrapper = shallow(<Home/>);

    expect(wrapper).toMatchSnapshot();
  });

  test('should have a ".home" class', () => {
    wrapper = shallow(<Home/>);

    expect(wrapper.is('.home')).toBe(true);
  });

  test('should render a PageHeader', () => {
    wrapper = shallow(<Home/>);

    let count = wrapper.find('PageHeader').length;

    expect(count).toBe(1);
  });

  test('should render a Grid layout with one row & two columns', () => {
    wrapper = shallow(<Home/>);

    let grid = wrapper.find('Grid').length;
    let row = wrapper.find('Row').length;
    let col = wrapper.find('Col').length;

    expect(grid).toBe(1);
    expect(row).toBe(1);
    expect(col).toBe(2);
  });

  test('should render a tournaments component', () => {
    wrapper = shallow(<Home/>);

    let count = wrapper.find('Tournaments').length;

    expect(count).toBe(1);
  });

});
