import React from 'react';

import GameDetails from '../../client/components/game_details';

import { mockData } from '../mockData';

describe('GameDetails', () => {
  let players = mockData.players.slice(1);
  let wrapper = shallow(
    <GameDetails
      game={mockData.games.slice(3)[0]}
      player1={players[0]}
      player2={players[1]}
    />
  );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
