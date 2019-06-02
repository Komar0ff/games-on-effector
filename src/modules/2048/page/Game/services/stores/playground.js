import { gameDomain } from '../domain';
import { mountEvent, newGameEvent, moveEvent, scoreUpdateEvent } from '../events';
import { generation, random, equal, full, scoring, moving } from '../helpers';

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
		(_, payload) => payload
	)

	.on(moveEvent, (state, payload) => {
		let newState = moving(state, payload);
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
		equalFlag && fullFlag ? console.log('You lose') : null;
		return newState;
	});
