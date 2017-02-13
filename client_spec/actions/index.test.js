import * as actions from '../../client/actions';
import { SELECT_TAB } from '../../client/actions/types';

describe('Actions', () => {

  describe('"selectTab" action', () => {

    test('should have selectTab action', () => {
      expect(actions.selectTab).toBeDefined();
    });

    test('should return an action with type of "SELECT_TAB"', () => {
      let action = actions.selectTab('onGoing');

      expect(action.type).toBe(SELECT_TAB);
      expect(action.payload).toBe('onGoing');
    });
  });


});
