import React from 'react';
import TableRow from '../../client/components/stats_table_row';

import { buildTable, normalize } from '../../client/utilities';
import { mockData } from '../mockData';


describe('TableRow', () => {
  let { players, games } = mockData;

  players = normalize(players);
  games = normalize(games);
  let table = buildTable(games, players);

  let wrapper = shallow(
    <TableRow
      player={table[1]}
    />
  );

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
