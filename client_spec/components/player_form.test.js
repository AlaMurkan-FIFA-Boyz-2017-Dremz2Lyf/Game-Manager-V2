import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';
import PlayerForm from '../../client/components/player_form';
import { normalize } from '../../client/utilities';

describe('PlayerForm', () => {
  let wrapper = mount(
    <Provider store={store}>
      <PlayerForm/>
    </Provider>
  );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


});
