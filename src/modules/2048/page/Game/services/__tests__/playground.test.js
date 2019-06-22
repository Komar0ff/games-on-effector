import { mountEvent, moveEvent } from '../events';
import { $playground } from '../stores/playground';
import '../__mocks__/playground.mock.js';

describe('With localStorage tests', () => {
	it('Playground mounting with empty playground', () => {
		let localStorage = { playground: [], count: 2, width: 3, height: 4 }; //localStorage imitation

		mountEvent(localStorage);

		let playgroundStore = $playground.getState(); // storage state after mounting

		expect(playgroundStore.length).toBe(4);
		expect(playgroundStore[0].length).toBe(3);
	});

	it('Playground mounting with playground', () => {
		let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation
		mountEvent(localStorage);

		let playgroundStore = $playground.getState(); // storage state after mounting
		expect(playgroundStore.length).toBe(2);
		expect(playgroundStore[0].length).toBe(3);
	});
});

it.todo('Without localstorage test');

describe('Move events', () => {
	it('New block has been added', () => {
		let keyCode = 37;
		let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let playgroundStore = $playground.getState();
		let playgroundHeight = localStorage.height;
		let playgroundWidth = localStorage.width;
		let playgroundActiveBlocks = localStorage.count + 1;

		let counterActiveBlock = 0;
		for (let i = 0; i < playgroundHeight; i++) {
			for (let j = 0; j < playgroundWidth; j++) {
				if (playgroundStore[i][j]) ++counterActiveBlock;
			}
		}

		expect(counterActiveBlock).toBe(playgroundActiveBlocks);
	});

	it('Do not added the active block if the states is equal after moving', () => {
		let keyCode = 37;
		let localStorage = { playground: [[8, 16, 0], [1024, 0, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let playgroundStore = $playground.getState();
		expect(playgroundStore).toEqual(localStorage.playground);
	});

	it.todo('Load game');
	it.todo('Revert step');
});
