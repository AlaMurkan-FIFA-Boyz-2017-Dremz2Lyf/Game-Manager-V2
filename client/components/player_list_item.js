import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const PlayerListItem = ({player, move, stats}) => {
  const { id, username, wins = 0, losses = 0, draws = 0 } = player;
  let style = id % 2 === 0 ? 'even' : 'odd';
  return (
    <ListGroupItem className={`lgi-inner-text ${style}`} onClick={() => { move(`${id}`); }}>
      <div className='player-name'>{username}</div>
      <div>Record: {`${wins}-${losses}-${draws}`}</div>
    </ListGroupItem>
  );
};

export { PlayerListItem as default };
