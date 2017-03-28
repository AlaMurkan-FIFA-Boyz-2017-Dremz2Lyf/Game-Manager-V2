import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Panel
} from 'react-bootstrap';

import Game from './game';

export class Games extends Component {

  renderGames() {
    let { games = {} } = this.props;
    return Object.keys(games).map(id => (
      <Game key={id} game={games[id]} />
    ));
  }

  render() {
    return (
      <Panel>
        <h4>Select a game below to play!</h4>
        <ListGroup>
          {this.renderGames()}
        </ListGroup>
      </Panel>
    );
  }
}

export default Games;
