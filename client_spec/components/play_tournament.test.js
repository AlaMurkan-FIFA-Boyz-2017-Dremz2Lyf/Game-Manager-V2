import React from 'react';

import { PlayTournament } from '../../client/components/play_tournament';

describe('PlayTournament Component', () => {
  let mockUpdate = jest.fn();
  let wrapper = shallow(
    <PlayTournament
      games={mockData.games}
    />
  );

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();

  });



});
