import React from 'react';
import { Panel, Tabs, Tab, Row, Col} from 'react-bootstrap';

// Custom components
import Tournaments from './tournaments';
import PlayerList from './player_list';
import { OverallTable } from './stats_table';

export default (props) => (
  <Row>
    <Col xs={12} md={5}>
      <Tournaments />
    </Col>
    <Col xs={12} md={7}>
      <OverallTable label={'All Time Table'}/>
    </Col>
  </Row>
);
