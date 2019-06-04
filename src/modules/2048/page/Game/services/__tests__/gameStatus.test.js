import { mountEvent, newGameEvent, moveEvent } from '../events';
import { $playground } from '../stores/playground';
import { $gameStatus } from '../stores/gameStatus';

describe('Game status tests', () => {
	it('New game event', () => {
		let localStorage = { playground: [], count: 2, width: 3, height: 4 }; //localStorage imitation
		newGameEvent(localStorage);

		let playgroundStore = $playground.getState();
		let gameStatus = $gameStatus.getState();

		expect(playgroundStore.length).toBe(4);
		expect(playgroundStore[0].length).toBe(3);
		expect(gameStatus).toBe('IN_PROGRESS');
	});

	it('Game over', () => {
		let keyCode = 37;
		let localStorage = { playground: [[2, 4, 8], [2, 1024, 4]], count: 2, width: 3, height: 2 }; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let playgroundStore = $playground.getState();
		let gameStatus = $gameStatus.getState();

		expect(playgroundStore).toEqual(localStorage.playground);
		expect(gameStatus).toBe('LOSE');
	});
});
