import React from 'react';
import { connect } from 'react-redux';
import { Table, Panel } from 'react-bootstrap';

export const StatsTable = ({players, label}) => {

  let tableRows = Object.keys(players).map(id => {
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
      possession
    } = players[id];

    let goalDiff = goalsFor - goalsAgainst;

    return (
      <tr key={id}>
        <td>{username}</td>
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
        <td>{possession || '0'}</td>
      </tr>
    );
  });

  return (
    <Panel>
      <h4>{label}</h4>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>Player</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Shots</th>
            <th>OnGoal</th>
            <th>Yellow</th>
            <th>Red</th>
            <th>Poss.</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    </Panel>
  );
};

StatsTable.propTypes = {
  players: React.PropTypes.object.isRequired,
  label: React.PropTypes.string
};

// This displayName lets Istanbul know the functional Component's name, and will prevent snapshots breaking between regular tests, and Coverage tests.
StatsTable.displayName = 'StatsTable';

export const mapStateToProps = ({data}) => ({
  players: data.players
});

export default connect(mapStateToProps)(StatsTable);
