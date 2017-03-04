import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const PlayerListItem = ({player, move}) => {
  const { id, username, wins, losses, draws } = player;
  return (
    <ListGroupItem onClick={() => { move(`${id}`); }}>
      <div className='player-name'>{username}</div>
      <div>Record: {`${wins}-${losses}-${draws}`}</div>
    </ListGroupItem>
  );
};

export { PlayerListItem as default };
