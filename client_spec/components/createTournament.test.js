import React from 'react';
import { CreateTournament } from '../../client/components/create_tournament';

describe('CreateTournament', () => {
  let shallowWrapper = shallow(<CreateTournament/>);

  test('should match the snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });


});
