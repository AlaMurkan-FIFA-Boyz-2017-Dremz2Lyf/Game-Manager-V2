import React, { Component } from 'react';
import { connect } from 'react-redux';

import { update } from '../actions';

import {
  Modal,
  ListGroupItem,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import GameDetails from './game_details';
import GameForm from './game_form';

export class Game extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  handleSubmit(values) {
    // Pull the game, the tournaments, and the update action creator from props.
    let { game, tournaments, update } = this.props;

    // then grab the id, tournament id and p1Score from the game.
    let { id, tournament, p1Score} = game;

    // lastly, grab the gamesPlayed from the tournament corresponding to this game.
    let { gamesPlayed } = tournaments[tournament];

    // Because both scores are required to update a game, we can check if the game has been played with just one of the scores.
    if (p1Score === null) {
      // If this is the first time this game is being updated, we increment the game count, and update the tournament.
      ++gamesPlayed;
      update('tournaments', {id: tournament, gamesPlayed});
    }

    // Update the game in the database with the values from the form and a status of finished.
    update('games', {id, ...values, status: 'finished'});
    this.setState({
      showModal: false
    });
  }

  render() {
    let { game } = this.props;
    let { players } = this.props;

    return (
      <ListGroupItem onClick={this.open.bind(this)}>
        <GameDetails
          game={game}
          player1={players[game.p1]}
          player2={players[game.p2]}
        />
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Finish this Game!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={3}>
              </Col>
              <Col xs={2}>
                <h4>{players[game.p1].username}</h4>
              </Col>
              <Col xs={2}>
                <h4>{players[game.p2].username}</h4>
              </Col>
              <Col xs={5}>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <GameForm
                  onSubmit={this.handleSubmit.bind(this)}
                  initialValues={game}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </ListGroupItem>
    );
  }
}

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  players: React.PropTypes.object.isRequired
};

export const mapStateToProps = ({ data }) => ({
  players: data.players,
  tournaments: data.tournaments
});

export default connect(mapStateToProps, { update })(Game);
