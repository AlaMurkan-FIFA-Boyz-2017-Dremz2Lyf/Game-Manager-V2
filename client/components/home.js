// Dependancies
import React, { Component } from 'react';
import {
  PageHeader,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Custom components
import Tournaments from './tournaments';

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
            <Col>

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
