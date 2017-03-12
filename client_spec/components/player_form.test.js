import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';
import Connected, { PlayerForm, required, getValidationState, popover } from '../../client/components/player_form';
import { normalize } from '../../client/utilities';

describe('PlayerForm', () => {
  let mounted = mount(
    <Provider store={store}>
      <Connected/>
    </Provider>
  );

  test('should match the snapshot', () => {

    expect(mounted).toMatchSnapshot();
  });

  it('should handle required validation', () => {
    expect(required()).toBe('What? are you no one? A faceless man?');
    expect(required('something')).toBeUndefined();
  });

  it('should have a popover', () => {
    let popWrapper = shallow(popover);
    expect(popWrapper).toMatchSnapshot();
  });

  describe('Prop mocking', () => {
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

    it('should have a handleSubmit prop, called on submit', () => {
      wrapper.find('form').simulate('submit');

      expect(submitMock).toHaveBeenCalled();
    });

    it('should add a HelpBlock if there was an error', () => {

      expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(false);

      wrapper.setProps({isPristine: false});

      expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(true);

      wrapper.setProps({isValid: true});

      expect(wrapper.contains('Tough luck, someone beat you to it.')).toBe(false);
    });

    it('notTaken should check against the players if the name is taken.', () => {
      let noError = wrapper.instance().notTaken('scott');
      let taken = wrapper.instance().notTaken('alice');
      expect(noError).toBeUndefined();
      expect(taken).toBe('Tough luck, someone beat you to it.');
    });

  });


});
