// Dependancies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetch } from '../actions/index';

//Pre-built components from react bootstrap
import {
  Panel,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';

// Components
import { Tournament } from './tournament';
import CreateTournament from './create_tournament';

export class Tournaments extends Component {
  constructor() {
    super();

    this.state = {
      activeKey: 'onGoing'
    };
  }

  componentDidMount() {
    this.props.fetch('tournaments');
    this.props.fetch('players');
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  renderList() {
    let { activeKey } = this.state;
    let { tournaments = {} } = this.props;

    let show = activeKey === 'finished' ? true : false;

    let filtered = Object.keys(tournaments).reduce((organized, id) => {
      if (tournaments[id].winner === null) {
        organized.onGoing.push(
          <Tournament key={id} tournament={tournaments[id]}/>
        );
      } else {
        organized.finished.push(
          <Tournament key={id} tournament={tournaments[id]}/>
        );
      }
      return organized;
    }, {
      finished: [],
      onGoing: []
    });

    switch (activeKey) {
    case 'create':
      return <CreateTournament />;
    case 'onGoing':
      return (
        <ListGroup>
          {filtered.onGoing}
        </ListGroup>
      );
    case 'finished':
      return (
        <ListGroup>
          {filtered.finished}
        </ListGroup>
      );
    }

  }

  render() {
    let { activeKey } = this.state;

    return (
      <div className="tournaments">
        <Panel>
          <Nav bsStyle="tabs" activeKey={activeKey} onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey="finished">Finished</NavItem>
            <NavItem eventKey="onGoing">OnGoing</NavItem>
            <NavItem eventKey="create">Create</NavItem>
          </Nav>
          {this.renderList()}
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({data}) => {

  return {
    tournaments: data.tournaments
  };
};

export default connect(mapStateToProps, { fetch })(Tournaments);
