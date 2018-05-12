import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { deleteFromSavedGames, loadGameFromSaved } from '../../actions/gameState';
import GameListItem from '../GameListItem';
import showToast from '../Toast';

const getSize = (blockCount, blockSize, marginSize) => `${(blockSize * blockCount) + (marginSize * (blockCount - 1))}px`;

const GameList = ({ games, loadGame, deleteGame }) => (
  <div>
    {games.length === 0 ?
      <h1
        style={{
          textAlign: 'center',
          margin: '100px',
          color: '#182026',
        }}
      >
        You don`t have saved games
      </h1> :
      null
    }
    {games.map((game, index) => (
      <GameListItem
        game={game}
        size={{
          height: getSize(game.size.height, game.size.blockSize, game.size.borderWidth),
          width: getSize(game.size.width, game.size.blockSize, game.size.borderWidth),
        }}
        onLoad={loadGame(index)}
        onDelete={deleteGame(index)}
      />
    ))}
  </div>
);

GameList.propTypes = {
  games: React.PropTypes.arrayOf(React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }),
    score: React.PropTypes.number.isRequired,
    size: React.PropTypes.shape({
      blockSize: React.PropTypes.number.isRequired,
      borderWidth: React.PropTypes.number.isRequired,
    }),
  })).isRequired,
  loadGame: React.PropTypes.func.isRequired,
  deleteGame: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  games: state.games.saved,
}), dispatch => ({
  loadGame: index => () => {
    dispatch(loadGameFromSaved(index));
    hashHistory.push('#');
  },
  deleteGame: index => () => {
    dispatch(deleteFromSavedGames(index));
    showToast('Game was successfuly deleted');
  },
}))(GameList);
