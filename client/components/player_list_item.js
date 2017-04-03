import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const PlayerListItem = ({player, move, stats}) => {
  const { id, username, wins = 0, losses = 0, draws = 0 } = player;
  return (
    <ListGroupItem onClick={() => { move(`${id}`); }}>
      <div className='player-name'>{username}</div>
      <div>Record: {`${wins}-${losses}-${draws}`}</div>
    </ListGroupItem>
  );
};

export { PlayerListItem as default };
