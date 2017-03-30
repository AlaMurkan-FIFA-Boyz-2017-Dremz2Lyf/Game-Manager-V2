import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';

import { App } from '../../client/components/app';

describe('Shallow App', () => {
  let wrapper = shallow(<App/>);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call fetch when mounted', () => {
    let mockFetch = jest.fn();
    let mounted = mount(
      <Provider store={store}>
        <App
          fetch={mockFetch}
        />
      </Provider>
    );
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]).toEqual(['players']);
    mockFetch.mockClear();
  });
});
