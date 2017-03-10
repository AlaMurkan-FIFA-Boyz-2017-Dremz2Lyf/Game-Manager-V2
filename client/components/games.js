import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup
} from 'react-bootstrap';

import Game from './game';

import { fetch } from '../actions';

export class Games extends Component {

  componentDidMount() {
    this.props.fetch('games', {type: 'tournament', id: this.props.tournament});
  }

  renderGames() {
    let { games = {} } = this.props;
    return Object.keys(games).map(id => (
      <Game key={id} game={games[id]} />
    ));
  }

  render() {
    return (
      <ListGroup>
        {this.renderGames()}
      </ListGroup>
    );
  }
}

export const mapStateToProps = ({ data }) => ({
  games: data.games
});

export default connect(mapStateToProps, { fetch })(Games);

Games.propTypes = {
  tournament: React.PropTypes.string
};
