import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';

import { PlayTournament, mapStateToProps } from '../../client/components/play_tournament';

describe('PlayTournament Component', () => {
  let mockFetch = jest.fn();
  let mockReceive = jest.fn();
  let wrapper = shallow(
    <PlayTournament
      params={{id: '1'}}
    />
  );
  let mounted = mount(
    <Provider store={store}>
      <PlayTournament
        params={{id: '1'}}
        receive={mockReceive}
      />
    </Provider>
  );

  test('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  test('should clear the games when unmounted', () => {
    mounted.unmount();

    expect(mockReceive).toHaveBeenCalled();
    expect(mockReceive.mock.calls[0]).toEqual(['games', []]);
  });

});
