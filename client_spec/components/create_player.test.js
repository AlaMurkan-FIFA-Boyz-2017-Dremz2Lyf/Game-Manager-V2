import React from 'react';
import { Provider } from 'react-redux';

import Connected, { CreatePlayer } from '../../client/components/create_player';
import { store } from '../../client/store';

describe('CreatePlayer Component', () => {
  let mockCreate = jest.fn();
  let shallowWrapper = shallow(<CreatePlayer create={mockCreate}/>);
  let mounted = mount(
    <Provider store={store}>
      <Connected />
    </Provider>
  );

  test('should match the snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  test('should open the modal when clicked', () => {
    // Check that the state defaults to a closed modal
    expect(shallowWrapper.state().showModal).toBe(false);

    // simulate the click event
    shallowWrapper.find('ListGroupItem').simulate('click');

    // and expect that the state has changed to show the modal
    expect(shallowWrapper.state().showModal).toBe(true);
  });

  test('should close the model', () => {
    // Start out with the Modal open
    shallowWrapper.setState({showModal: true});

    // Find the modal and simulate a hide event
    shallowWrapper.find('Modal').simulate('hide');

    expect(shallowWrapper.state().showModal).toBe(false);
  });

  test('should handleSubmit properly', () => {
    // Start out with the Modal open
    shallowWrapper.setState({showModal: true});

    shallowWrapper.find('ReduxForm').simulate('submit');

    expect(mockCreate.mock.calls[0]).toEqual(['players', undefined]);
    expect(shallowWrapper.state().showModal).toBe(false);
  });

});
