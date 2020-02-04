import { mountEvent, newGameEvent, moveEvent } from '../events';
import { $playground } from '../stores/playground';
import { $gameStatus } from '../stores/gameStatus';

/**
 * > Game in progress
 * > Game over
 * > Game win
 */

beforeEach(() => $gameStatus.setState(''));
describe.skip('Game status tests', () => {
	let keyCode = 37;
	it('Game in progress', () => {
		newGameEvent({ count: 2 });

		let gameStatus = $gameStatus.getState();
		expect(gameStatus).toBe('IN_PROGRESS');
	});

	it('Game over', () => {
		let localStorage = {
			playground: [
				[2, 4, 8],
				[2, 1024, 4]
			],
			count: 2,
			width: 3,
			height: 2
		}; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let playgroundStore = $playground.getState();
		let gameStatus = $gameStatus.getState();

		expect(playgroundStore).toEqual(localStorage.playground);
		expect(gameStatus).toBe('LOSE');
	});

	it('Game win', () => {
		let localStorage = {
			playground: [
				[2, 4, 8],
				[1024, 1024, 4]
			],
			count: 2,
			width: 3,
			height: 2
		}; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let gameStatus = $gameStatus.getState();
		expect(gameStatus).toBe('WIN');
	});
});
