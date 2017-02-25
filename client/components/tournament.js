import React from 'react';
import { ProgressBar, Col, Row, ListGroupItem } from 'react-bootstrap';

export const Tournament = ({tournament = {}}) => (
  <ListGroupItem className="tournament">
    <Row>
      <Col xs={7} className="name">
        <div>{tournament.name}</div>
      </Col>
      <Col xs={5} className="date">
        <span>{tournament.createdAt}</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ProgressBar active now={50}></ProgressBar>
      </Col>
    </Row>
  </ListGroupItem>
);
