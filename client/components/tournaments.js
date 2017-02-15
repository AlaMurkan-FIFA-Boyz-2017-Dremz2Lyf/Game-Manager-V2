import React, { Component } from 'react';
import { Panel, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class Tournaments extends Component {

  handleSelect(eventKey) {
    console.log(eventKey);

  }

  render() {
    let activeKey = 'onGoing';
    return (
      <div className="tournaments">
        <Panel>
          <Nav bsStyle="tabs" activeKey={activeKey} onSelect={this.handleSelect}>
            <NavItem eventKey="finished">Finished</NavItem>
            <NavItem eventKey="onGoing">OnGoing</NavItem>
            <NavItem eventKey="create">Create</NavItem>
          </Nav>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeKey: state.tournaments.activeKey,
    onGoing: state.tournaments.onGoing,
    finished: state.tournaments.finished
  };
};

export default connect(mapStateToProps, null)(Tournaments);
