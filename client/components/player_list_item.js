import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const PlayerListItem = ({player, move, stats, style}) => {
  const { id, username, wins = 0, losses = 0, draws = 0 } = player;

  return (
    <ListGroupItem className={`${style}`} onClick={() => { move(`${id}`); }}>
      <div className='inner-text hover'>
        <span>{username}</span>
        <span className='record'>{`${wins}-${losses}-${draws}`}</span>
      </div>
    </ListGroupItem>
  );
};

export { PlayerListItem as default };
