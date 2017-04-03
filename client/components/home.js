import React from 'react';
import { Panel, Tabs, Tab, Row, Col} from 'react-bootstrap';

// Custom components
import Tournaments from './tournaments';
import PlayerList from './player_list';
import { OverallTable } from './stats_table';

export default (props) => (
  <Row>
    <Col xs={12} md={6}>
      <Tournaments />
    </Col>
    <Col xs={12} md={6}>
      <OverallTable label={'All Time Table'} headers={['Player', 'W', 'L', 'D', 'GF', 'GA', 'GD', 'S', 'OT', 'R', 'Y', 'Po']}/>
    </Col>
  </Row>
);
