import { mountEvent, moveEvent, savedGameEvent, scoreUpdateEvent } from '../events';
import { $playground, $moveCount, $gameSaved } from '../stores/playground';

it('Mount', () => {
	mountEvent({ count: 2, width: 10, height: 10 });

	expect($playground.getState().cells.length).toBe(10);
	expect($playground.getState().tiles.length).toBe(2);
});

describe('With localStorage tests', () => {
	beforeEach(
		() => (
			$playground.setState({
				tiles: [],
				cells: []
			}),
			window.localStorage.removeItem('savedGames'),
			mountEvent({
				playground: {
					tiles: [],
					cells: [[0, 0, 0], [0, 0, 0]],
					count: 2,
					width: 3,
					height: 2
				}
			}) // mount localStorage imitation
		)
	);

	it('Playground mounting with playground', () => {
		let playgroundStore = $playground.getState(); // storage state after mounting

		expect(playgroundStore.cells.length).toBe(2);
		expect(playgroundStore.cells[0].length).toBe(3);
	});

	it('Games saving', () => {
		savedGameEvent();

		let playgroundFirstSave = JSON.parse(window.localStorage.getItem('savedGames'));
		expect(playgroundFirstSave).toEqual([
			{
				move: 0,
				score: 0,
				playground: {
					tiles: [],
					cells: [[0, 0, 0], [0, 0, 0]],
					count: 2,
					width: 3,
					height: 2
				}
			}
		]);

		// $playground.setState([[8, 0, 0], [1024, 0, 0]]); // change after move event imitation
		// savedGameEvent();

		// let playgroundSecondSave = JSON.parse(window.localStorage.getItem('savedGames'));
		// expect(playgroundSecondSave).toEqual([
		// 	{
		// 		move: 0,
		// 		score: 0,
		// 		playground: [[8, 0, 0], [1024, 0, 0]]
		// 	},
		// 	{
		// 		move: 0,
		// 		score: 0,
		// 		playground: [[0, 0, 8], [0, 1024, 0]]
		// 	}
		// ]);
	});
});

describe('Move events', () => {
	it('Move up/left', () => {
		let localStorage = {
			playground: {
				tiles: [{ x: 0, y: 1, value: 2 }, { x: 0, y: 3, value: 2 }],
				cells: [
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0]
				],
				count: 2,
				width: 5,
				height: 5
			}
		};

		mountEvent(localStorage);
		moveEvent(38);

		expect($playground.getState()).toEqual([{ x: 0, y: 0, value: 4 }]);
	});

	it('Move down/right', () => {
		let localStorage = {
			playground: {
				tiles: [{ x: 0, y: 1, value: 2 }, { x: 0, y: 3, value: 2 }],
				cells: [
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0]
				],
				count: 2,
				width: 5,
				height: 5
			}
		};

		mountEvent(localStorage);
		moveEvent(40);

		expect($playground.getState()).toEqual([{ x: 0, y: 5, value: 4 }]);
	});

	//deprecated

	// it('New block has been added', () => {
	// 	let keyCode = 37;
	// 	let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation

	// 	mountEvent(localStorage);
	// 	moveEvent(keyCode);

	// 	let playgroundStore = $playground.getState();
	// 	let playgroundHeight = localStorage.height;
	// 	let playgroundWidth = localStorage.width;
	// 	let playgroundActiveBlocks = localStorage.count + 1;

	// 	let counterActiveBlock = 0;
	// 	for (let i = 0; i < playgroundHeight; i++) {
	// 		for (let j = 0; j < playgroundWidth; j++) {
	// 			if (playgroundStore[i][j]) ++counterActiveBlock;
	// 		}
	// 	}

	// 	expect(counterActiveBlock).toBe(playgroundActiveBlocks);
	// });

	it.todo('Load game');
	it.todo('Revert step');
});
