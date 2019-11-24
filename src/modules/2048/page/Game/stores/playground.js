import { combine } from 'effector';
import { gameDomain } from '../domain';
import { IndexDecrease, IndexIncrease } from '../mechanics';
import {
	mountEvent,
	newGameEvent,
	moveEvent,
	scoreUpdateEvent,
	gameStartEvent,
	gameWinEvent,
	gameLoseEvent,
	savedGameEvent,
	scoreCleanEvent
} from '../events';
import { $score } from './score';

import { generation, random, equal, full, scoring, moving, winning } from '../../../helpers';

export const $moveCount = gameDomain.store(0);
$moveCount.on(scoreUpdateEvent, (state) => ++state).reset(newGameEvent);

export const $playground = gameDomain.store({
	tiles: [],
	cells: []
});

$playground
	.on(
		mountEvent.map(
			({ playground, count, width, height }) => playground || generation(count, width, height)
		),
		(_, payload) => payload
	)

	.on(
		newGameEvent.map(({ count, width, height }) => generation(count, width, height)),
		(_, payload) => (gameStartEvent(), scoreCleanEvent(), payload)
	)

	.on(moveEvent, (state, payload) => {
		let result;
		let vector;

		// switch slow
		// TODO: add exception catch
		if (payload == 37) {
			result = new IndexDecrease(state.tiles, 'x');
		} else if (payload == 38) {
			result = new IndexDecrease(state.tiles, 'y');
		} else if (payload == 39) {
			result = new IndexIncrease(state.tiles, 'x');
			vector = state.width;
		} else if (payload == 40) {
			result = new IndexIncrease(state.tiles, 'y');
			vector = state.height;
		}

		console.log(state);

		result
			.subsetFormation()
			.findSameBlocksAndMerge()
			.moveToFreeSpace(vector)
			.subsetIntegration()
			.tileGeneration(state.width, state.height);

		return result.tiles;
	})
	.updates.watch((playground) =>
		window.localStorage.setItem('playground', JSON.stringify(playground))
	);

export const $gameSaved = combine(
	$moveCount,
	$score,
	$playground,
	(move, { score }, playground) => ({
		move: move,
		score: score,
		playground: playground
	})
);

$gameSaved.on(savedGameEvent, (state) => {
	// TODO redundancy test
	let previous = JSON.parse(window.localStorage.getItem('savedGames'));

	previous
		? window.localStorage.setItem('savedGames', JSON.stringify([state, ...previous]))
		: window.localStorage.setItem('savedGames', JSON.stringify([state]));
});
