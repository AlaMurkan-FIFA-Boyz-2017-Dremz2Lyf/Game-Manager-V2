import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  ListGroupItem,
  FormControl,
  FormGroup,
  ControlLabel,
  InputGroup,
  DropdownButton,
  MenuItem,
  Button
} from 'react-bootstrap';

import PlayerList from './player_list';
import CreatePlayer from './create_player.js';
import PlayerForm from './player_form';

import { create } from '../actions/index';

export class CreateTournament extends Component {
  constructor() {
    super();

    this.state = {
      playerSearch: '',
      name: '',
      rounds: '1 Round',
      added: []
    };
  }
  // All of the event handlers
  handleRounds(rounds) {
    this.setState({
      rounds: rounds
    });
  }

  handleSearch(e) {
    this.setState({
      playerSearch: e.target.value
    });
  }

  handlerName(e) {
    this.setState({
      name: e.target.value
    });
  }

  // handles the submittion of the tournament, and creates it with a post to the database.
  handleSubmit(e) {
    e.preventDefault();
    let { rounds, added, name } = this.state;
    rounds = rounds.slice(0, 1);
    this.props.create('tournaments', { name, rounds, added });
  }

  // added takes boolean dictating if the list renders the players added to the tournament (true) or all the others (false).
  added(includeAdded) {
    let { players = {} } = this.props;
    let { added } = this.state;

    return Object.keys(players).filter(id =>
      added.includes(id) === includeAdded
    ).map(id => players[id]);
  }

  // move will check the local state to see if the id is in the added Array
    // if it is, remove it. Otherwise we add it.
  move(id) {
    let { added } = this.state;
    let newAdded = added.indexOf(id) !== -1 ? (
      added.filter((addedId) => addedId !== id)
    ) : (
      [...added, id]
    );
    this.setState({
      added: newAdded
    });
  }

  renderOptions(number) {
    return [<MenuItem onClick={this.handleRounds.bind(this, '1 Round')} key={1}>1 Round</MenuItem>].concat([...Array(number).keys()].slice(1)
      .filter(num => num % 2 === 0 )
      .map(num => (<MenuItem onClick={this.handleRounds.bind(this, `${num} Rounds`)} key={num}>{num} Rounds</MenuItem>)));
  }



  render() {
    let { rounds, name, playerSearch } = this.state;

    return (
      <div>
        <Row>
          <Col xs={12}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <ControlLabel>Tournament Name</ControlLabel>
                <InputGroup>

                <InputGroup.Button>
                  <Button type='submit'>Go!</Button>
                </InputGroup.Button>
                <FormControl
                  name='name'
                  type='text'
                  placeholder='Tournament Name'
                  onChange={this.handlerName.bind(this)}
                  value={name}
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  title={rounds}
                  id='tournament_rounds'
                >
                  {this.renderOptions(13)}
                </DropdownButton>
                </InputGroup>
              </FormGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
          <ControlLabel>Add Players!</ControlLabel>
          <div>
            <FormControl
              onChange={this.handleSearch.bind(this)}
              value={playerSearch}
              name='playerSearch'
              type='text'
              placeholder='Who do you want to play with?'
            />
          </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <PlayerList
              name='all-players'
              players={this.added(false)}
              move={this.move.bind(this)}
              searchValue={playerSearch}
              all={true}
            />
          </Col>
          <Col xs={6}>
            <PlayerList
              name='added-players'
              players={this.added(true)}
              move={this.move.bind(this)}
              searchValue={''}
              all={false}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export const mapStateToProps = ({data}) => {
  return {
    players: data.players
  };
};

export default connect(mapStateToProps, { create })(CreateTournament);
