import { mountEvent, moveEvent, savedGameEvent, scoreUpdateEvent } from '../events';
import { $playground, $moveCount, $gameSaved } from '../stores/playground';

it.skip('Mount', () => {
	mountEvent({ count: 2, width: 10, height: 10 });

	expect($playground.getState().cells.length).toBe(10);
	expect($playground.getState().tiles.length).toBe(2);
});

describe.skip('With localStorage tests', () => {
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
					cells: [
						[0, 0, 0],
						[0, 0, 0]
					],
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
					cells: [
						[0, 0, 0],
						[0, 0, 0]
					],
					count: 2,
					width: 3,
					height: 2
				}
			}
		]);
	});
});

describe('Move events', () => {
	it('Move up/left', () => {
		let localStorage = {
			playground: {
				tiles: [
					{ x: 0, y: 1, value: 2 },
					{ x: 0, y: 3, value: 2 }
				],
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

		expect($playground.getState()[0]).toEqual({ x: 0, y: 0, value: 4 });
	});

	it('Move down/right', () => {
		let localStorage = {
			playground: {
				tiles: [
					{ x: 0, y: 1, value: 2 },
					{ x: 0, y: 3, value: 2 }
				],
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

		expect($playground.getState()[0]).toEqual({ x: 0, y: 5, value: 4 });
		expect($playground.getState().length).toBe(2);
	});

	it.todo('Load game');
	it.todo('Revert step');
});
