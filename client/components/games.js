import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Panel,
  Carousel
} from 'react-bootstrap';

import Game from './game';

export class Games extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(index, {direction}) {
    this.setState({ index, direction });
  }

  renderGames(status) {
    let { games = {} } = this.props;

    return Object.keys(games).filter(id => (
      games[id].status === status
    )).map(id => (
      <Game key={id} game={games[id]} />
    ));
  }

  render() {
    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect.bind(this)}
      >
        <Carousel.Item>
          <div className='games'>
            {this.renderGames('created')}
          </div>
          <Carousel.Caption>
            <h3>Click on a game to play!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className='games'>
            {this.renderGames('finished')}
          </div>
          <Carousel.Caption>
            <h3>Click on a finished game to view it</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Games;
