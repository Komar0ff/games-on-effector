import { cloneDeep } from 'lodash';

export const saveGame = (savedGames, game) => {
  const newGame = cloneDeep(game);
  return savedGames.length < 10 ? [newGame, ...savedGames] : [newGame, ...savedGames.slice(0, 9)];
};

export const deleteGame = (games, index) => [
  ...games.slice(0, index),
  ...games.slice(index + 1),
];
export const loadGame = (games, index) => games[index];

export default { saveGame, deleteGame, loadGame };
