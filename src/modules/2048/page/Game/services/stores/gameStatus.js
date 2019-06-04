import { gameDomain } from '../domain';
import { gameStartEvent, gameLoseEvent } from '../events';

export const $gameStatus = gameDomain
	.store('')
	.on(gameStartEvent, () => 'IN_PROGRESS')
	.on(gameLoseEvent, () => 'LOSE');
