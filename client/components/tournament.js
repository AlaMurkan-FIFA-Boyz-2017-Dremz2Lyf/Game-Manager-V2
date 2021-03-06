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
  let { name, createdAt, updatedAt, gamesPlayed, totalGames, id } = tournament;
  let played = percentPlayed(gamesPlayed, totalGames);
  let message = played > 25 ? `${gamesPlayed} out of ${totalGames} played` : null;
  let style = tournament.id % 2 === 0 ? 'even' : 'odd';
  let created = new Date(createdAt).toDateString();
  let updated = new Date(updatedAt).toDateString();
  return (
    <ListGroupItem className={style}>
      <Link to={`play/${id}`}>
        <Row>
          <Col xs={4}>
            <div className='inner-text'>{name}</div>
          </Col>
          <Col xs={8} className='date'>
            <span className='inner-text date'>{`Started: ${created}`}</span>
            <br/>
            <span className='inner-text date'>{`Last played: ${updated}`}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProgressBar active bsStyle='success' now={played} label={message}></ProgressBar>
          </Col>
        </Row>
      </Link>
    </ListGroupItem>
  );
};

// This displayName lets Istanbul Know the functional Component's name, and will prevent snapshots breaking between regular tests, and Coverage tests.
Tournament.displayName = 'Tournament';
