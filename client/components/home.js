import React from 'react';
import { Panel, Tabs, Tab, Row, Col} from 'react-bootstrap';

// Custom components
import Tournaments from './tournaments';
import PlayerList from './player_list';


export const Home = (props) => (
  <Row>
    <Col xs={12} md={6}>
      <Tournaments />
    </Col>
    <Col xs={12} md={6}>

    </Col>
  </Row>
);
