import React from 'react';

import { Row, Col, ProgressBar } from 'react-bootstrap';

const GameDetails = ({ game, player1, player2 }) => (
  <Row className='inner-text hover'>
    <Col xs={5}>
      <span className='player1-name'>{player1.username}</span>
      <span className='player1-score'>{game.p1Score}</span>
    </Col>
    <Col xs={2} className='vs'>
      vs.
    </Col>
    <Col xs={5}>
      <span className='player2-score'>{game.p2Score}</span>
      <span className='player2-name'>{player2.username}</span>
    </Col>
  </Row>
);


GameDetails.propTypes = {
  game: React.PropTypes.object.isRequired,
  player1: React.PropTypes.object.isRequired,
  player2: React.PropTypes.object.isRequired
};

export default GameDetails;
