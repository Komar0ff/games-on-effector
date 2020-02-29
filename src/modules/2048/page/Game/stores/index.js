import { combine, createEvent } from 'effector';
import { $playground } from './Playground';
import { $score } from './Score';
import { $status } from './Status';

export const $gameState = combine(
	$status,
	$score,
	$playground,
	(status, { score }, playground) => ({
		status: status,
		score: score,
		playground: playground
	})
);

export const saveGame = createEvent('save game');

$gameState.on(saveGame, (state, payload) => {
	let previous = JSON.parse(window.localStorage.getItem('savedGames'));

	previous
		? window.localStorage.setItem('savedGames', JSON.stringify([state, ...previous]))
		: window.localStorage.setItem('savedGames', JSON.stringify([state]));
});
