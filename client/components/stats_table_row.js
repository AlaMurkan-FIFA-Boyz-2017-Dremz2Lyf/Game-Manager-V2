import React from 'react';

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
    id,
    goalDiff,
    points
  } = player;

  return (
    <tr key={id}>
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
      <td>{(poss || '0') + '%'}</td>
    </tr>
  );
};

export default StatsTableRow;
