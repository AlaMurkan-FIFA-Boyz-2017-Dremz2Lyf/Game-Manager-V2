// Dependancies
import React from 'react';
import { Provider } from 'react-redux';

// Components
import { Tournaments, mapStateToProps } from '../../client/components/tournaments.js';

// Grab our store and our action to prePopulate
import { store } from '../../client/store';

describe('Tournaments Component', () => {
  let wrapper = shallow(<Tournaments tournaments={mockData.tournaments}/>);
  let panel = wrapper.find('Panel');

  test('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  test('should render a tournament element', () => {

    expect(wrapper.is('.tournaments')).toBe(true);
  });

  test('should default to onGoing', () => {

    expect(wrapper.contains(<h4>OnGoing Tournaments</h4>)).toBe(true);
  });

  test('should call componentDidMount', () => {
    let mockFetch = jest.fn();
    let mounted = mount(
      <Provider store={store}>
        <Tournaments fetch={mockFetch} tournaments={mockData.tournaments}/>
      </Provider>
    );

    expect(mockFetch.mock.calls[0]).toEqual(['tournaments']);
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

  describe('Panel Child Component', () => {

    test('should exist', () => {

      let count = panel.length;

      expect(count).toBe(1);
    });

    test('should have three Tabs', () => {

      expect(wrapper.find('Tab')).toHaveLength(3);
    });

    test('Tabs should have titles of "onGoing", "finished", & "create"', () => {
      expect(wrapper.find('[title="OnGoing"]')).toHaveLength(1);
      expect(wrapper.find('[title="Finished"]')).toHaveLength(1);
      expect(wrapper.find('[title="Create One"]')).toHaveLength(1);
    });

    test('should render different content for the correct tab', () => {

      wrapper.find('Tab').find('[title="Finished"]').simulate('click');
      expect(wrapper.contains(<h4>Finished Tournaments</h4>)).toBe(true);
    });

  });

});
