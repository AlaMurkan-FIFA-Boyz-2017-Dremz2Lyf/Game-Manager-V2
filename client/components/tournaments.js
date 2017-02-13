import React, { Component } from 'react';
import { Panel, Nav, NavItem } from 'react-bootstrap';

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

export default Tournaments;
