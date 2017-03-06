// Dependancies
import React, { Component } from 'react';
import {
  PageHeader,
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  Panel
} from 'react-bootstrap';

// Custom components
import Tournaments from './tournaments';
import PlayerList from './player_list';

const tabsInstance = (
  <Panel>
    <Tabs defaultActiveKey={2}>
      <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
      <Tab eventKey={2} title="Tab 2"><PlayerList searchValue='' all={true}/></Tab>
      <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
    </Tabs>
  </Panel>
);

class Home extends Component {

  render() {
    return (
      <div className="home">
        <PageHeader>Game Manager</PageHeader>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <Tournaments />
            </Col>
            <Col xs={12} md={6}>
              {tabsInstance}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}



export default Home;
