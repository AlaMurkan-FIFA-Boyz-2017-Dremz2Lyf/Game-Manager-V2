import React, { Component } from 'react';
import { connect } from 'react-redux';

import { update } from '../actions';

import {
  Modal,
  ListGroupItem,
  Button
} from 'react-bootstrap';

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

  render() {
    let { game } = this.props;
    let { players } = this.props;

    return (
      <ListGroupItem onClick={this.open.bind(this)}>
        <div>{players[game.p1].username}</div>
        <div>{players[game.p2].username}</div>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Make a new Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            get that body
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
  players: data.players
});

export default connect(mapStateToProps, { update })(Game);
