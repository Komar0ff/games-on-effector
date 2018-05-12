import React from 'react';
import Grid from '../Grid';

import './GameListItem.css';

const GameListItem = ({ game, size, onDelete, onLoad }) => (
  <div>
    <Grid
      game={game}
      width={size.width}
      height={size.height}
    />
    <div
      className="pt-card GameListItem-info"
      style={{
        width: size.width,
      }}
    >
      <button
        type="button"
        className="pt-button pt-icon-export pt-intent-primary"
        onClick={onLoad}
      >Load</button>
      <button
        type="button"
        className="pt-button pt-icon-trash pt-intent-danger"
        onClick={onDelete}
      >Delete</button>
      <span className="pt-ui-text-large">Score: {game.score}</span>
    </div>
  </div>
);

GameListItem.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.string,
    height: React.PropTypes.string,
  }).isRequired,
  onLoad: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  game: React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }).isRequired,
    score: React.PropTypes.number.isRequired,
    size: React.PropTypes.shape({
      blockSize: React.PropTypes.number.isRequired,
      borderWidth: React.PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default GameListItem;
