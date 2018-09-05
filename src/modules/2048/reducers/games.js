import { getNewGameState, getNewBlocksAfterKeyPress } from './currentGame';
import { saveGame, deleteGame, loadGame } from './savedGames';
import { actionTypes, GAME_STATUS } from '../constants';
import getBestScores from './bestScores';

const defaultSetting = {
  width: 4,
  height: 4,
  blockSize: 100,
  borderWidth: 10,
};

const defaultState = {
  currentGame: getNewGameState(defaultSetting),
  saved: [],
  bestScores: {},
  settings: defaultSetting,
};


export default (state = defaultState, action) => {
  let currentGame;
  switch (action.type) {
    case (actionTypes.PRESS_KEY):
      currentGame = (getNewBlocksAfterKeyPress(state.currentGame, action.vector));
      return {
        ...state,
        currentGame,
        bestScores: getBestScores(state.bestScores, currentGame.score, currentGame.size),
      };
    case (actionTypes.NEW_GAME):
      return {
        ...state,
        currentGame: {
          ...getNewGameState(state.settings),
          bestScore: state.currentGame.bestScore,
        },
      };
    case (actionTypes.CONTINUE_GAME):
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          status: GAME_STATUS.PLAY,
        },
      };
    case (actionTypes.SAVE_GAME):
      return {
        ...state,
        saved: saveGame(state.saved, state.currentGame),
      };
    case (actionTypes.LOAD_GAME_FROM_SAVED):
      return {
        ...state,
        currentGame: loadGame(state.saved, action.index),
      };
    case (actionTypes.DELETE_FROM_SAVED_GAMES):
      return {
        ...state,
        saved: deleteGame(state.saved, action.index),
      };
    case (actionTypes.REVERT_STEP): // eslint-disable-line
      const lastIndexOfHistory = state.currentGame.history.length - 1;
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          score: state.currentGame.history[lastIndexOfHistory].score,
          blocks: state.currentGame.history[lastIndexOfHistory].blocks,
          history: [...state.currentGame.history.slice(0, lastIndexOfHistory)],
        },
      };
    case (actionTypes.CHANGE_SETTINGS):
      return {
        ...state,
        settings: action.settings,
      };
    default: return state;
  }
};
