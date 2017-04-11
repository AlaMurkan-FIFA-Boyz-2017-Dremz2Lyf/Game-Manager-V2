import React from 'react';

import { getAverage } from '../utilities';

const StatsTableRow = ({player}) => {
  let {
    username,
    wins,
    losses,
    draws,
    goalsFor,
    goalsAgainst,
    shots,
    onGoal,
    reds,
    yellows,
    poss,
    passAcc,
    id,
    goalDiff,
    points
  } = player;

  return (
    <tr className='inner-text' key={id}>
      <td>{username}</td>
      <td>{points || '0'}</td>
      <td>{wins || '0'}</td>
      <td>{losses || '0'}</td>
      <td>{draws || '0'}</td>
      <td>{goalsFor || '0'}</td>
      <td>{goalsAgainst || '0'}</td>
      <td>{goalDiff || '0'}</td>
      <td>{shots || '0'}</td>
      <td>{onGoal || '0'}</td>
      <td>{reds || '0'}</td>
      <td>{yellows || '0'}</td>
      <td>{getAverage(poss) + '%'}</td>
    </tr>
  );
};

export default StatsTableRow;
