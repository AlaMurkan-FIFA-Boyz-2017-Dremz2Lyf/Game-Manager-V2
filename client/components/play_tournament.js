import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';

import { receive } from '../actions';

import Games from './games';
import { StatsTable } from './stats_table';

export class PlayTournament extends Component {

  componentWillUnmount() {
    this.props.receive('games', []);
  }

  render() {
    let { params } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <StatsTable players={{}} label={'Current Table'}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Games tournament={params.id}/>
          </Col>
        </Row>
      </div>
    );
  }
}

PlayTournament.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default connect(null, { receive })(PlayTournament);
