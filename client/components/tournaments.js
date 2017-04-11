// Dependancies
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../actions/index';

//Pre-built components from react bootstrap
import {
  Tabs,
  Tab,
  Carousel,
  ListGroup
} from 'react-bootstrap';

// Components
import { Tournament } from './tournament';
import CreateTournament from './create_tournament';

export class Tournaments extends Component {
  constructor() {
    super();
    this.state = {
      index: 1,
      direction: null
    };
  }

  componentDidMount() {
    this.props.fetch('tournaments');
  }

  handleSelect(index, {direction}) {
    this.setState({ index, direction });
  }

  renderList(finished) {
    let { tournaments = {} } = this.props;

    return Object.keys(tournaments).reduce((list, id) => {
      let tournament = tournaments[id];
      if (!!tournament.winner === finished) {
        list.push(<Tournament key={tournament.id} tournament={tournament}/>);
      }
      return list;
    }, []);
  }

  render() {

    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect.bind(this)}
      >
        <Carousel.Item>
          <ListGroup className='tournament-list'>
            {this.renderList(true)}
          </ListGroup>
          <Carousel.Caption>
            <h3>Finished Tournaments</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ListGroup className='tournament-list'>
            {this.renderList(false)}
          </ListGroup>
          <Carousel.Caption>
            <h3>OnGoing Tournaments</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CreateTournament />
        </Carousel.Item>
      </Carousel>
    );
  }
}

export const mapStateToProps = ({data}) => ({
  tournaments: data.tournaments
});

export default connect(mapStateToProps, { fetch })(Tournaments);
