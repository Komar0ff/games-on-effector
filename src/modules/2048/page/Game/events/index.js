import { gameDomain } from '../domain';

export const mountEvent = gameDomain.event('mount event');
export const newGameEvent = gameDomain.event('new game event');
export const revertGameEvent = gameDomain.event('revert game event');
export const savedGameEvent = gameDomain.event('saved game event');
export const moveEvent = gameDomain.event('move on playground');

//score
export const scoreUpdateEvent = gameDomain.event('update score and best score');
export const scoreCleanEvent = gameDomain.event('clear score');

// game status
export const gameStartEvent = gameDomain.event('game in progress');
export const gameLoseEvent = gameDomain.event('game lose');
export const gameWinEvent = gameDomain.event('game win');
export const gamePauseEvent = gameDomain.event('game pause'); //only in speed mode
