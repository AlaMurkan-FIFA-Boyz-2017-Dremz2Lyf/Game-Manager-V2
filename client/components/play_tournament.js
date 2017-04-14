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
    let { fetch, receive } = this.props;
    receive('games', []);
    fetch('table');
  }

  render() {
    let { games = {}, players = {} } = this.props;

    let table = buildTable(games, players);

    return (
      <div>
        <Row>
          <Col xs={12} md={5}>
            <Games games={games}/>
          </Col>
          <Col xs={12} md={7}>
            <StatsTable table={table} label={'Current Table'}/>
          </Col>
        </Row>
      </div>
    );
  }
}

PlayTournament.propTypes = {
  params: React.PropTypes.object.isRequired
};

export const mapStateToProps = ({data: {games, players}}) => ({
  games,
  players
});

export default connect(mapStateToProps, { receive, fetch })(PlayTournament);
