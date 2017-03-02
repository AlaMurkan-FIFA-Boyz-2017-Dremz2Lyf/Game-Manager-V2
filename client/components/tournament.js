import React from 'react';
import { ProgressBar, Col, Row, ListGroupItem } from 'react-bootstrap';

import { percentPlayed } from '../utilities';

export const Tournament = ({ tournament = {} }) => {
  let { name, createdAt, gamesPlayed, totalGames } = tournament;
  return (
    <ListGroupItem className="tournament">
      <Row>
        <Col xs={7} className="name">
          <div>{name}</div>
        </Col>
        <Col xs={5} className="date">
          <span>{createdAt}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ProgressBar active now={percentPlayed(gamesPlayed, totalGames)}></ProgressBar>
        </Col>
      </Row>
    </ListGroupItem>
  );
};
