import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Panel, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import TableRow from './stats_table_row';

export const StatsTable = ({table, label}) => {
  let headers = ['Player', 'P', 'W', 'L', 'D', 'GF', 'GA', 'GD', 'S', 'OT', 'Y', 'R', 'Po'];

  let tableRows = Object.values(table).sort((a, b) => {
    if (a.points === b.points) {
      return a.goalDiff < b.goalDiff;
    }
    return a.points < b.points;
  }).map(player => (
    <TableRow key={player.id} player={player} />
  ));

  let currentHeaders = headers.map(header => <th key={header}>{header}</th>);

  return (
    <Panel>
      <h4>{label}</h4>
      <Table bordered striped responsive>
        <thead>
          <tr>
            {currentHeaders}
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
  table: React.PropTypes.object.isRequired,
  label: React.PropTypes.string
};

// This displayName lets Istanbul know the functional Component's name, and will prevent snapshots breaking between regular tests, and Coverage tests.
StatsTable.displayName = 'StatsTable';

export const mapTableToProps = ({data}) => ({
  table: data.table
});



export const OverallTable = connect(mapTableToProps)(StatsTable);
