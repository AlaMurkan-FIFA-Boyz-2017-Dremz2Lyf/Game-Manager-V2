// Dependancies
import React from 'react';
import { Provider } from 'react-redux';

// Components
import Connected, { Tournaments, mapStateToProps } from '../../client/components/tournaments.js';

// Grab our store and our action to prePopulate
import { store } from '../../client/store';

describe('Tournaments Component', () => {
  let wrapper = shallow(<Tournaments/>);
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
        <Tournaments fetch={mockFetch} tournaments={{}}/>
      </Provider>
    );

    expect(mockFetch).toHaveBeenCalledWith(['players', 'tournaments']);
  });

  test('should have a mapStateToProps', () => {
    let fakeStore = {
      data: {
        tournaments: {}
      }
    };

    expect(mapStateToProps(fakeStore)).toEqual({tournaments: {}});
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
