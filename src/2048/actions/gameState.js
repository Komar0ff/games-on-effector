import { actionTypes } from '../constants';

export const newGame = () => ({
  type: actionTypes.NEW_GAME,
});

export const continueGame = () => ({
  type: actionTypes.CONTINUE_GAME,
});

export const saveGame = () => ({
  type: actionTypes.SAVE_GAME,
});

export const deleteFromSavedGames = index => ({
  type: actionTypes.DELETE_FROM_SAVED_GAMES,
  index,
});

export const loadGameFromSaved = index => ({
  type: actionTypes.LOAD_GAME_FROM_SAVED,
  index,
});

export const revertStep = () => ({
  type: actionTypes.REVERT_STEP,
});

export const changeSettings = settings => ({
  type: actionTypes.CHANGE_SETTINGS,
  settings,
});

export default {
  newGame,
  continueGame,
  saveGame,
  deleteFromSavedGames,
  loadGameFromSaved,
  revertStep,
  changeSettings,
};
