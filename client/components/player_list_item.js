import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default ({player, move}) => {
  const { id, username, wins, losses, draws } = player;
  return (
    <ListGroupItem onClick={() => { move(id); }}>
      <div>{username}</div>
      <div>Record: {`${wins}-${losses}-${draws}`}</div>
    </ListGroupItem>
  );
};
