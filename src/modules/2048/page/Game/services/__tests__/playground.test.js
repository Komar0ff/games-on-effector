import { mountEvent, moveEvent, savedGameEvent } from '../events';
import { $playground } from '../stores/playground';

describe('With localStorage tests', () => {
	beforeEach(
		() => (
			$playground.setState([]),
			window.localStorage.removeItem('savedGames'),
			mountEvent({ playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 2 }) // mount localStorage imitation
		)
	);

	it('Playground mounting with playground', () => {
		let playgroundStore = $playground.getState(); // storage state after mounting

		expect(playgroundStore.length).toBe(2);
		expect(playgroundStore[0].length).toBe(3);
	});

	it('Games saving', () => {
		savedGameEvent();
		let playgroundFirstSave = JSON.parse(window.localStorage.getItem('savedGames'));
		console.log('playgroundFirstSave', playgroundFirstSave);
		expect(playgroundFirstSave).toEqual([[[0, 0, 8], [0, 1024, 0]]]);

		$playground.setState([[8, 0, 0], [1024, 0, 0]]); // change after move event imitation
		savedGameEvent();

		let playgroundSecondSave = JSON.parse(window.localStorage.getItem('savedGames'));
		console.log('playgroundSecondSave', playgroundSecondSave);
		expect(playgroundSecondSave).toEqual([[[8, 0, 0], [1024, 0, 0]], [[0, 0, 8], [0, 1024, 0]]]);
	});
});

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
