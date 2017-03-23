import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Panel
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
      <Panel>
        <h4>Click on a game below to play!</h4>
        <ListGroup>
          {this.renderGames()}
        </ListGroup>
      </Panel>
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
