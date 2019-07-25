import { gameDomain } from '../domain';
import {
	mountEvent,
	newGameEvent,
	moveEvent,
	scoreUpdateEvent,
	gameStartEvent,
	gameWinEvent,
	gameLoseEvent,
	savedGameEvent
} from '../events';
import { generation, random, equal, full, scoring, moving, winning } from '../../../../helpers';

export const $playground = gameDomain.store([]);

$playground
	.on(
		mountEvent.map(({ playground, count, width, height }) =>
			playground.length ? playground : generation(count, width, height)
		),
		(_, payload) => payload
	)

	.on(
		newGameEvent.map(({ count, width, height }) => generation(count, width, height)),
		(_, payload) => (gameStartEvent(), payload)
	)

	.on(savedGameEvent, (state, payload) => {
		// TODO redundancy test
		let previous = JSON.parse(window.localStorage.getItem('savedGames'));

		previous
			? window.localStorage.setItem('savedGames', JSON.stringify([state, ...previous]))
			: window.localStorage.setItem('savedGames', JSON.stringify([state]));
	})

	.on(moveEvent, (state, payload) => {
		let newState = moving(state, payload);
		let win = winning(newState);

		if (!win) {
			let flag = true;
			let fullFlag = full(newState);
			let equalFlag = equal(state, newState);

			if (!equalFlag) {
				while (flag) {
					let newActiveBlock = random(1, newState.length, newState[0].length);

					!newState[newActiveBlock[0][0]][newActiveBlock[0][1]]
						? ((newState[newActiveBlock[0][0]][newActiveBlock[0][1]] = 2), (flag = false))
						: null;
				}
			}

			scoreUpdateEvent(scoring(newState));
			equalFlag && fullFlag ? gameLoseEvent() : null;

			return newState;
		} else gameWinEvent();
	});
