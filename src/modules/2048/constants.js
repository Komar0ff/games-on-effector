import keymirror from 'key-mirror';

export const actionTypes = keymirror({
  PRESS_KEY: null,

  NEW_GAME: null,
  CONTINUE_GAME: null,
  SAVE_GAME: null,

  DELETE_FROM_SAVED_GAMES: null,
  LOAD_GAME_FROM_SAVED: null,

  REVERT_STEP: null,

  CHANGE_SETTINGS: null
});

export const VECTORS = {
  UP: {
    x: 0,
    y: -1
  },
  DOWN: {
    x: 0,
    y: 1
  },
  LEFT: {
    x: -1,
    y: 0
  },
  RIGHT: {
    x: 1,
    y: 0
  }
};

export const KEY_CODES = {
  38: 'UP',
  40: 'DOWN',
  37: 'LEFT',
  39: 'RIGHT'
};

export const GAME_STATUS = keymirror({
  PLAY: null,
  LOSE: null,
  WIN: null
});

export default { actionTypes, KEY_CODES, GAME_STATUS, VECTORS };
