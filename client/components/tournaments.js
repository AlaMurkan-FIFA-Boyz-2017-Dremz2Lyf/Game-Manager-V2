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

export class Tournaments extends Component {
  constructor() {
    super();

    this.state = {
      activeKey: 'onGoing'
    };
  }
  componentDidMount() {
    // this.props.fetch('tournaments');
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  messWithData() {
    this.props.fetch('tournaments');
  }

  renderList() {
    let { activeKey } = this.state;
    let { tournaments = {} } = this.props;
    let show = activeKey === 'finished' ? true : false;

    return Object.keys(tournaments).filter(id =>
      !!tournaments[id].winner === show
    ).map(id => (
        <ListGroupItem key={id}>
          <Tournament tournament={tournaments[id]}/>
        </ListGroupItem>
      )
    );
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
          <ListGroup fill>
            {this.renderList()}
          </ListGroup>
        </Panel>
        <Button onClick={this.messWithData.bind(this)}>Yeah</Button>
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
