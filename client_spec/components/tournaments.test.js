// Dependancies
import React from 'react';
import sinon from 'sinon';

// Components
import Tournaments from '../../client/components/tournaments.js';

describe('Tournaments Component', () => {
  let shallowRender = shallow(<Tournaments/>);
  let panel = shallowRender.find('Panel');
  let nav = shallowRender.find('Panel Nav');
  let navItems = shallowRender.find('NavItem');

  test('should match snapshot', () => {

    expect(shallowRender).toMatchSnapshot();
  });

  test('should render a tournament element', () => {

    expect(shallowRender.is('.tournaments')).toBe(true);
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

    test('should call a handler for changing the active tab', () => {

      navItems.find('[eventKey="finished"]').simulate('select');

      expect('placeholder for ').toBe('testing if the action has been called');
    });
  });

});
