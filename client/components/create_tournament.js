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
  InputGroup
} from 'react-bootstrap';

import PlayerListItem from './player_list_item';
import CreatePlayer from './create_player.js';
import PlayerForm from './player_form';


export class CreateTournament extends Component {
  constructor() {
    super();

    this.state = {
      playerSearch: '',
      tName: '',
      rounds: 2,
      added: {}
    };
  }

  handleSearch(e) {
    this.setState({
      playerSearch: e.target.value
    });
  }

  tNameHandler(e) {
    this.setState({
      tName: e.target.value
    });
  }

  showPlayers() {
    let { players } = this.props;
    let { playerSearch } = this.state;

    return Object.keys(players).reduce((playerList, id) => {
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

  render() {

    return (
      <div>
        <form>
          <div>
            <label>Tournament Name</label>
            <div>
              <input
                name='tName'
                type='text'
                placeholder='Tournament Name'
                onChange={this.tNameHandler.bind(this)}
                value={this.state.tName}
              />
            </div>
          </div>
        </form>
        <div>
          <label>Add Players!</label>
          <div>
            <input
              onChange={this.handleSearch.bind(this)}
              value={this.state.playerSearch}
              name='playerSearch'
              type='text'
              placeholder='Who do you want to play with?'
            />
          </div>
        </div>
        <Row>
          <Col xs={6}>
            <ListGroup>
              {this.showPlayers()}
              <CreatePlayer existingPlayers={{...this.props.players, ...this.state.added}}/>
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

export default connect(mapStateToProps)(CreateTournament);
