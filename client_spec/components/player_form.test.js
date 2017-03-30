import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';
import Connected, { PlayerForm, getValidationState, popover } from '../../client/components/player_form';
import { normalize, required } from '../../client/utilities';

import { mockData } from '../mockData';


describe('Connected PlayerForm', () => {
  let mounted = mount(
    <Provider store={store}>
      <Connected/>
    </Provider>
  );

  test('should match the snapshot', () => {

    expect(mounted).toMatchSnapshot();
  });

});

describe('PlayerForm Popover', () => {

  test('should match the snapshot', () => {
    let popWrapper = shallow(popover);
    expect(popWrapper).toMatchSnapshot();
  });

});

describe('Shallow PlayerForm with mocks', () => {
  let submitMock = jest.fn();
  let wrapper = shallow(
    <PlayerForm
      allPlayers={mockData.players}
      handleSubmit={submitMock}
      isPristine={true}
      isValid={false}
      syncErrors={{username: 'Tough luck, someone beat you to it.'}}
    />
  );

  test('should have a handleSubmit prop, called on submit', () => {
    wrapper.find('form').simulate('submit');

    expect(submitMock).toHaveBeenCalled();
    submitMock.mockClear();
  });

  test('should add a HelpBlock if there was an error', () => {

    expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(false);

    wrapper.setProps({isPristine: false});

    expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(true);

    wrapper.setProps({isValid: true});

    expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(false);
  });

  test('notTaken should check against the players if the name is taken.', () => {
    let noError = wrapper.instance().notTaken('scott');
    let taken = wrapper.instance().notTaken('alice');
    expect(noError).toBeUndefined();
    expect(taken).toBe('Tough luck, someone beat you to it.');
  });

});
