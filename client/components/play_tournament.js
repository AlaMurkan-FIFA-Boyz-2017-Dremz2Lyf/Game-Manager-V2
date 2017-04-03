import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';

import { receive, fetch } from '../actions';

import Games from './games';
import { StatsTable } from './stats_table';

import { buildTable } from '../utilities';

export class PlayTournament extends Component {

  componentWillMount() {
    let { fetch, params: { id } } = this.props;
    fetch('games', {type: 'tournament', id: id});
    fetch('tournaments', {id});
  }

  componentWillUnmount() {
    this.props.receive('games', []);
  }

  render() {
    let { games = {}, players = {} } = this.props;

    let table = buildTable(games, players);

    let tableHeaders = ['Player', 'P', 'W', 'L', 'D', 'GF', 'GA', 'GD', 'S', 'OT', 'Y', 'R', 'Po'];

    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <StatsTable table={table} current={true} headers={tableHeaders}label={'Current Table'}/>
          </Col>
          <Col xs={12} md={6}>
            <Games games={games}/>
          </Col>
        </Row>
      </div>
    );
  }
}

PlayTournament.propTypes = {
  params: React.PropTypes.object.isRequired
};

export const mapGamesToProps = ({data: {games, players}}) => ({
  games,
  players
});

export default connect(mapGamesToProps, { receive, fetch })(PlayTournament);
