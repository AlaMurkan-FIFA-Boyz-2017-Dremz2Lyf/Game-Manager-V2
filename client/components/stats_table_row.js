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
    passAcc,
    id,
    goalDiff,
    points
  } = player;
  let gamesPlayed = (wins + losses + draws);
  let averagedPoss = poss.reduce((total, current) => total += current, 0) / gamesPlayed;
  let averagedPassing = passAcc.reduce((total, current) => total += current, 0) / gamesPlayed;

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
      <td>{(averagedPoss || '0') + '%'}</td>
    </tr>
  );
};

export default StatsTableRow;
