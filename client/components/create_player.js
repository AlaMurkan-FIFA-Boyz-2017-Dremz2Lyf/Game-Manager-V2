import React, { Component } from 'react';
import { Modal, ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlayerForm from './player_form';
import { create } from '../actions/index';

export class CreatePlayer extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false
    };
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  handleSubmit(values) {
    this.props.create('players', values);
    this.setState({
      showModal: false
    });
  }

  render() {

    return (
      <div>
        <ListGroupItem onClick={this.open.bind(this)}>
          Couldn't find who you were looking for? Click here to add a new player
        </ListGroupItem>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>Make a new Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlayerForm onSubmit={this.handleSubmit.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { create })(CreatePlayer);
