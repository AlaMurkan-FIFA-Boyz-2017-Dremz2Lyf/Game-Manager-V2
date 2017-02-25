// Dependancies
import React from 'react';
import { Provider } from 'react-redux';

// Components
import Connected, { Tournaments } from '../../client/components/tournaments.js';

// Grab our store and our action to prePopulate
import { store } from '../../client/store';

// let fakeProps = normalize(mockData.tournaments);

describe('Tournaments Component', () => {
  let shallowRender = shallow(<Tournaments/>);
  let panel = shallowRender.find('Panel');
  let nav = shallowRender.find('Panel Nav');
  let navItems = shallowRender.find('NavItem');
  // let list = mount(
  //   <Provider store={store}>
  //     <Connected />
  //   </Provider>
  // );

  test('should match snapshot', () => {

    expect(shallowRender).toMatchSnapshot();
  });

  test('should render a tournament element', () => {

    expect(shallowRender.is('.tournaments')).toBe(true);
  });

  test('should have local view state', () => {

    expect(shallowRender.state()).toBeDefined();
  });

  test('should have correct default state', () => {

    expect(shallowRender.state('activeKey')).toBe('onGoing');
  });

  describe('Panel Child Component', () => {

    test('should exist', () => {

      let count = panel.length;

      expect(count).toBe(1);
    });

    test('should have a Nav with three NavItem "tabs"', () => {

      let count = navItems.length;

      expect(shallowRender.find('[bsStyle="tabs"]')).toHaveLength(1);
      expect(count).toBe(3);
    });

    test('NavItems should have eventKeys of "onGoing", "finished", & "create"', () => {
      expect(navItems.find('[eventKey="onGoing"]')).toHaveLength(1);
      expect(navItems.find('[eventKey="finished"]')).toHaveLength(1);
      expect(navItems.find('[eventKey="create"]')).toHaveLength(1);
    });

    test('should default to OnGoing as the active tab', () => {

      expect(nav.find('[activeKey="onGoing"]')).toHaveLength(1);
    });

    test('should handleSelect for the correct tab', () => {

      nav.simulate('select', 'finished');

      expect(shallowRender.state('activeKey')).toBe('finished');
    });

    test('should default to a list', () => {

      expect(panel.find('ListGroup')).toHaveLength(1);
    });

  });

});
