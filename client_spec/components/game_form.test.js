import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../client/store';

import ReduxForm, { GameForm, Percentage } from '../../client/components/game_form';

describe('Connected GameForm', () => {
  let mounted = mount(
    <Provider store={store}>
      <ReduxForm />
    </Provider>
  );

  test('should match the snapshot', () => {
    expect(mounted).toMatchSnapshot();
  });

});

describe('Shallow Percentage component', () => {
  let wrapper;


  test('should show a HelpBlock with an error message if there is an error for Poss', () => {
    wrapper = shallow(
     <Percentage name='Poss' label='Percentage'/>
   );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({errors: {p1Poss: 'Possession should add up to 100%'}});

    // expect the snapshot to be correct
    expect(wrapper).toMatchSnapshot();

    // expect the message from the error to be added to the component
    expect(wrapper.contains('Possession should add up to 100%')).toBe(true);
  });

  test('should show a HelpBlock with an error message if there is an error for PassAcc', () => {
    wrapper = shallow(
     <Percentage name='PassAcc' label='Passing Accuracy'/>
   );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({errors: {p1PassAcc: 'This should be a valid Percentage'}});

    // expect the snapshot to be correct
    expect(wrapper).toMatchSnapshot();

    // expect the message from the error to be added to the component
    expect(wrapper.contains('This should be a valid Percentage')).toBe(true);
  });
});
