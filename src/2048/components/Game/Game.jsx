import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@blueprintjs/core';
import '@blueprintjs/core/dist/blueprint.css';

import { KEY_CODES, GAME_STATUS, VECTORS } from '../../constants';
import showToast from '../Toast';

import { getNameOfScoreField } from '../../reducers/bestScores'; // TODO fix dependend from reducer

import actions from '../../actions';
import Grid from '../Grid';
import Header from '../Header';

class Game extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getHeaderWidth = this.getHeaderWidth.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.handleSwipe();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('touchstart', this.touchstartHandle);
    document.removeEventListener('touchend', this.touchendHandle);
  }

  getHeaderWidth() {
    return `${(this.props.game.size.blockSize * this.props.game.size.width) +
           (this.props.game.size.borderWidth * (this.props.game.size.width + 1))}px`;
  }


  saveGame() {
    this.props.saveGame();
    showToast('Game saved');
  }

  handleSwipe() {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const handleGesure = () => {
      if (touchstartX - touchendX > 20) {
        this.props.onKeyPress.Left();
      }
      if (touchendX - touchstartX > 20) {
        this.props.onKeyPress.Right();
      }
      if (touchstartY - touchendY > 20) {
        this.props.onKeyPress.Up();
      }
      if (touchendY - touchstartY > 20) {
        this.props.onKeyPress.Down();
      }
    };


    this.touchstartHandle = (event) => {
      event.preventDefault();
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    };
    this.touchendHandle = (event) => {
      event.preventDefault();
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesure();
    };
    document.addEventListener('touchstart', this.touchstartHandle);
    document.addEventListener('touchend', this.touchendHandle);
  }

  handleKeyPress(e) {
    if (KEY_CODES[e.keyCode]) {
      this.props.onKeyPress(VECTORS[KEY_CODES[e.keyCode]]);
      e.preventDefault();
    }
  }
  render() {
    const { game } = this.props;
    let alertText;
    let alertButtonText;
    switch (game.status) { // eslint-disable-line
      case GAME_STATUS.WIN:
        alertText = `You win. Score: ${game.score}`;
        alertButtonText = 'Continue';
        break;
      case GAME_STATUS.LOSE:
        alertText = `Game over. Score: ${game.score}`;
        alertButtonText = 'Try again';
        break;
    }
    return (
      <div>
        <Header
          width={this.getHeaderWidth()}
          score={game.score}
          bestScore={this.props.bestScore}
          newGame={this.props.newGame}
          savedGamesCount={this.props.savedGamesCount}
          saveGame={this.saveGame}
          revertStep={this.props.revertStep}
          canRevertStep={!!game.history.length}
        />
        <Grid
          game={this.props.game}
        />
        <Alert
          isOpen={game.status !== GAME_STATUS.PLAY}
          confirmButtonText={alertButtonText}
          onConfirm={
            game.status === GAME_STATUS.LOSE ?
            this.props.newGame : this.props.continueGame
          }
        >{alertText}</Alert>
      </div>
    );
  }
}

Game.propTypes = {
  onKeyPress: React.PropTypes.func.isRequired,
  newGame: React.PropTypes.func.isRequired,
  continueGame: React.PropTypes.func.isRequired,
  saveGame: React.PropTypes.func.isRequired,
  revertStep: React.PropTypes.func.isRequired,
  savedGamesCount: React.PropTypes.number.isRequired,
  bestScore: React.PropTypes.number.isRequired,
  game: React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }).isRequired,
    size: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      blockSize: React.PropTypes.number.isRequired,
      borderWidth: React.PropTypes.number.isRequired,
    }).isRequired,
    score: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(state => ({
  game: state.games.currentGame,
  bestScore: state.games.bestScores[getNameOfScoreField(state.games.currentGame.size)] || 0,
  savedGamesCount: state.games.saved.length,
}), dispatch => ({
  onKeyPress: (vector) => {
    dispatch(actions.pressKey(vector));
  },
  newGame: () => {
    dispatch(actions.newGame());
  },
  continueGame: () => {
    dispatch(actions.continueGame());
  },
  saveGame: () => {
    dispatch(actions.saveGame());
  },
  revertStep: () => {
    dispatch(actions.revertStep());
  },
}))(Game);
