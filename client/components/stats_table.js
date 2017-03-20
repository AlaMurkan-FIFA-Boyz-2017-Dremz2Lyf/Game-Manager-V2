import React from 'react';
import { Table } from 'react-bootstrap';

export const StatsTable = ({players}) => (
  <Table>
    <thead>
      <th>Player</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Draws</th>
      <th>Goals For</th>
      <th>Goals Against</th>
      <th>Goal Differential</th>
      <th>Shots</th>
      <th>Shots On Goal</th>
      <th>Yellows</th>
      <th>Reds</th>
      <th>Possession</th>
    </thead>
    <tbody>
      <TableRows players={players}/>
    </tbody>
  </Table>
);

export const TableRows = (players) => {

};

// This displayName lets Istanbul Know the functional Component's name, and will prevent snapshots breaking between regular tests, and Coverage tests.
TableRows.displayName = 'TableRows';
