import React from 'react';
import { Link } from 'react-router';
import {
  ProgressBar,
  Col,
  Row,
  ListGroupItem,
  Button
} from 'react-bootstrap';

import { percentPlayed } from '../utilities';

export const Tournament = ({ tournament = {} }) => {
  let { name, createdAt, gamesPlayed, totalGames, id } = tournament;
  let played = percentPlayed(gamesPlayed, totalGames);
  let message = played > 25 ? `${gamesPlayed} out of ${totalGames} played` : null;
  return (
    <Link to={`play/${id}`}>
      <ListGroupItem className="tournament">
        <Row>
          <Col xs={7} className="name">
            <div>{name}</div>
          </Col>
          <Col xs={5} className="date">
            <span className='created-at'>{createdAt}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProgressBar active now={played} label={message}></ProgressBar>
          </Col>
        </Row>
      </ListGroupItem>
    </Link>
  );
};

// This displayName lets Istanbul Know the functional Component's name, and will prevent snapshots breaking between regular tests, and Coverage tests.
Tournament.displayName = 'Tournament';
