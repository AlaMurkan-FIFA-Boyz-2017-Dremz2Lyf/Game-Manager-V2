// Dependancies
import React from 'react';
import { Provider } from 'react-redux';

// Components
import { Tournaments, mapStateToProps } from '../../client/components/tournaments.js';

// Grab our store and our action to prePopulate
import { store } from '../../client/store';

import { mockData } from '../mockData';

describe('Tournaments Component', () => {
  let wrapper = shallow(<Tournaments tournaments={mockData.tournaments}/>);
  let panel = wrapper.find('Panel');

  test('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  test('should default to onGoing', () => {

    expect(wrapper.contains(<h3>OnGoing Tournaments</h3>)).toBe(true);
  });

  test('should call fetch on mount', () => {
    let mockFetch = jest.fn();
    let mounted = mount(
      <Provider store={store}>
        <Tournaments fetch={mockFetch} tournaments={mockData.tournaments}/>
      </Provider>
    );

    expect(mockFetch.mock.calls[0]).toEqual(['tournaments']);
    mockFetch.mockClear();
  });

  test('should have a mapStateToProps', () => {
    let fakeStore = {
      data: {
        tournaments: {}
      }
    };

    expect(mapStateToProps(fakeStore)).toEqual({tournaments: {}});
  });

  test('render list should build a list based on the boolean it was called with', () => {
    let finished = wrapper.instance().renderList(true);
    let onGoing = wrapper.instance().renderList(false);

    expect(finished).toHaveLength(1);
    expect(onGoing).toHaveLength(4);
  });

  test('should handle no props passed to it', () => {
    let empty = shallow(<Tournaments/>);

    expect(empty).toMatchSnapshot();

  });

});
