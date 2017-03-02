import React from 'react';
import { CreateTournament } from '../../client/components/create_tournament';

describe('CreateTournament', () => {
  let wrapper = shallow(<CreateTournament/>);

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


});
