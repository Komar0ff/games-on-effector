import React from 'react';
import { Alert } from '@blueprintjs/core';
import './Header.css';


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showAlert: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  showAlert() {
    this.setState({ showAlert: true });
  }

  hideAlert() {
    this.setState({ showAlert: false });
  }

  saveGame() {
    this.props.saveGame();
    this.hideAlert();
  }

  render() {
    return (
      <div style={{ width: this.props.width }} className="Header">
        <h2>
          Join the numbers and get to the 2048 tile!
        </h2>
        <div className="score">
          <p className="pt-card pt-ui-text-large">
            Score: {this.props.score}
          </p>
          <p className="pt-card pt-ui-text-large">
            Best: {this.props.bestScore}
          </p>
        </div>
        <button
          onClick={this.props.newGame}
          type="button"
          className="new-game-button pt-button pt-intent-primary pt-icon-refresh"
        >
          New game
        </button>
        <button
          onClick={this.props.savedGamesCount < 10 ?
            this.props.saveGame : this.showAlert
          }
          type="button"
          className="new-game-button pt-button pt-intent-primary pt-icon-floppy-disk"
        >
          Save game
        </button>
        <button
          onClick={this.props.revertStep}
          type="button"
          disabled={!this.props.canRevertStep}
          className="new-game-button pt-button pt-intent-primary pt-icon-undo"
        >
          Revert step
        </button>
        <Alert
          isOpen={this.state.showAlert}
          confirmButtonText="Yes"
          cancelButtonText="No"
          onConfirm={this.saveGame}
          onCancel={this.hideAlert}
        >
          You have 10 saved games. Do you want rewrite oldest game?
        </Alert>
      </div>
    );
  }
}

Header.propTypes = {
  width: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  bestScore: React.PropTypes.number.isRequired,
  savedGamesCount: React.PropTypes.number.isRequired,
  newGame: React.PropTypes.func.isRequired,
  saveGame: React.PropTypes.func.isRequired,
  canRevertStep: React.PropTypes.bool.isRequired,
  revertStep: React.PropTypes.func.isRequired,
};
export default Header;
