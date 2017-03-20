import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';

import { receive } from '../actions';

import Games from './games';

export class PlayTournament extends Component {

  componentWillUnmount() {
    this.props.receive('games', []);
  }

  render() {
    let { params } = this.props;

    return (
      <Row>
        <Col xs={12} md={6}>
          <Panel>
            <h4>Click on a game below to play!</h4>
            <Games tournament={params.id}/>
          </Panel>
        </Col>
        <Col xs={12} md={6}>

        </Col>
      </Row>
    );
  }
}

PlayTournament.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default connect(null, { receive })(PlayTournament);
