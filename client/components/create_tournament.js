import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  FormControl,
  FormGroup,
  ControlLabel,
  InputGroup,
  DropdownButton,
  MenuItem,
  Button
} from 'react-bootstrap';

import PlayerListItem from './player_list_item';
import CreatePlayer from './create_player.js';
import PlayerForm from './player_form';

import { create } from '../actions/index';

export class CreateTournament extends Component {
  constructor() {
    super();

    this.state = {
      playerSearch: '',
      name: '',
      rounds: 'rounds',
      added: {}
    };
  }

  handleSearch(e) {
    this.setState({
      playerSearch: e.target.value
    });
  }

  nameHandler(e) {
    this.setState({
      name: e.target.value
    });
  }

  showPlayers() {
    let { players = {} } = this.props;
    let { playerSearch } = this.state;

    return Object.keys(players)
      .sort((a, b) => {
        let { username: usernameA } = players[a];
        let { username: usernameB } = players[b];
        return usernameA > usernameB ? 1 : usernameA < usernameB ? -1 : 0;
      })
      .reduce((playerList, id) => {
        if (players[id].username.toLowerCase().indexOf(playerSearch.toLowerCase()) !== -1) {
          playerList.push(<PlayerListItem key={id} player={players[id]} move={this.addPlayers.bind(this)}/> );
        }
        return playerList;
      }, []);

  }

  addPlayers(id) {
    let { players } = this.props;

    let player = players[id];

    delete players[id];
    this.setState({
      added: {
        ...this.state.added,
        [id]: player
      }
    });
  }

  removePlayers(id) {
    let { added } = this.state;

    let player = added[id];

    delete added[id];
    this.props.players[id] = player;
    this.setState({
      added: added
    });

  }

  showAdded() {
    let { added } = this.state;

    return Object.keys(added).map(id => <PlayerListItem key={id} player={added[id]} move={this.removePlayers.bind(this)}/>);
  }

  handleRounds(num) {
    this.setState({
      rounds: num
    });
  }

  renderOptions(number) {

    return [<MenuItem onClick={this.handleRounds.bind(this, 1)} key={1}>{1}</MenuItem>].concat([...Array(number).keys()].slice(1)
      .filter(num => num % 2 === 0 )
      .map(num => (<MenuItem onClick={this.handleRounds.bind(this, num)} key={num}>{num}</MenuItem>)));
  }

  // handles the submit of the tournament, creates it with a post to the database.
  handleSubmit(e) {
    e.preventDefault();
    let { rounds, added, name } = this.state;
    rounds = rounds === 'rounds' ? 1 : rounds;
    this.props.create('tournaments', { name, rounds, added });
  }


  // This is a slightly hacky work around to get the players back into props
  componentWillUnmount() {
    let { added } = this.state;
    let id;
    for (id in added) {
      this.props.players[id] = added[id];
    }
  }

  render() {

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
                  onChange={this.nameHandler.bind(this)}
                  value={this.state.name}
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  title={this.state.rounds}
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
              value={this.state.playerSearch}
              name='playerSearch'
              type='text'
              placeholder='Who do you want to play with?'
            />
          </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <ListGroup>
              {this.showPlayers()}
              <CreatePlayer />
            </ListGroup>
          </Col>
          <Col xs={6}>
            <ListGroup>
              {this.showAdded()}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({data}) => {
  return {
    players: data.players
  };
};

export default connect(mapStateToProps, { create })(CreateTournament);
