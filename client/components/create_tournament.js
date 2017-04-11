import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

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
  Button,
  Panel
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
      playerSearch: e.target.value.toLowerCase()
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    });
  }

  // handles the submit of the tournament
  handleSubmit(e) {
    e.preventDefault();
    let { rounds, added, name } = this.state;
    rounds = rounds.slice(0, 1);
    this.props.create('tournaments', { name, rounds, added }).then((res) => {
      let id = Object.keys(res)[0];
      hashHistory.push(`/play/${id}`);
    });

  }

  // added takes boolean dictating if the list renders the players added to the tournament (true) or all the others (false).
  added(includeAdded) {
    let { players = {}, table = {} } = this.props;
    let { added } = this.state;

    return Object.keys(players).filter(id =>
      added.includes(id) === includeAdded
    ).map(id => ({...players[id], ...table[id]}));
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
      <Panel className='create-tournament'>
        <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
              <ControlLabel><h4>Tournament Name</h4></ControlLabel>
                <InputGroup>
                <FormControl
                  name='name'
                  type='text'
                  placeholder='Tournament Name'
                  onChange={this.handleName.bind(this)}
                  value={name}
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  title={rounds}
                  id='tournament_rounds'
                >
                  {this.renderOptions(13)}
                </DropdownButton>
                <InputGroup.Button>
                  <Button type='submit'>Create</Button>
                </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </Col>
          <Col xs={1}></Col>
        </Row>
        <Row>
          <Col xs={12}>
          </Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
          <Col xs={5}>
            <ControlLabel><h4>Add Players!</h4></ControlLabel>
            <FormControl
              onChange={this.handleSearch.bind(this)}
              value={playerSearch}
              name='playerSearch'
              type='text'
              placeholder='Search here for existing players to play with.'
            />
            <PlayerList
              players={this.added(false)}
              move={this.move.bind(this)}
              searchValue={playerSearch}
              all={true}
            />
          </Col>
          <Col xs={5}>
            <ControlLabel><h4>Added Players</h4></ControlLabel>
            <PlayerList
              players={this.added(true)}
              move={this.move.bind(this)}
              searchValue={''}
              all={false}
            />
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Panel>
    );
  }
}

export const mapStateToProps = ({data}) => ({
  players: data.players,
  table: data.table
});

export default connect(mapStateToProps, { create })(CreateTournament);
