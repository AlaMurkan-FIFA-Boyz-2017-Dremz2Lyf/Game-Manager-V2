import React from 'react';
import { ListGroup } from 'react-bootstrap';

import PlayerListItem from './player_list_item';
import CreatePlayer from './create_player';

const PlayerList = ({players = [], searchValue, all, move, name}) => {
  let list = players.filter(player =>
    player.username.toLowerCase().indexOf(searchValue) !== -1
  ).map(player =>
    <PlayerListItem key={player.id} player={player} move={move}/>
  );

  return (
    <ListGroup className={name}>
      {list}
      {all && <CreatePlayer />}
    </ListGroup>
  );
};


PlayerList.propTypes = {
  players: React.PropTypes.array,
  searchValue: React.PropTypes.string.isRequired,
  all: React.PropTypes.bool.isRequired,
  move: React.PropTypes.func.isRequired
};

export { PlayerList as default };
