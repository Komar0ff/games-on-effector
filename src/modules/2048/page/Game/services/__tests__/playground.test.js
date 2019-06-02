import { mountEvent, moveEvent } from '../events';
import { $playground, moving } from '../stores/playground';


describe('With localStorage tests', () => {
	it('Playground mounting with empty playground', () => {
		let localStorage = { playground: [], count: 2, width: 3, height: 4 }; //localStorage imitation
		expect($playground.getState()).toEqual([]);

		mountEvent(localStorage);

		let playgroundStore = $playground.getState(); // storage state after mounting
		expect(playgroundStore.length).toBe(4);
		expect(playgroundStore[0].length).toBe(3);
	});

	it.todo('TODO: fix problem with isolation.');

	it('Playground mounting with playground', () => {
		let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation
		mountEvent(localStorage);

		let playgroundStore = $playground.getState(); // storage state after mounting
		expect(playgroundStore.length).toBe(2);
		expect(playgroundStore[0].length).toBe(3);
	});
});


describe('Move events', () => {
	it('Arrow left move event', () => {
		const oldState = [[0, 0, 8, 0], [8, 16, 8, 0], [0, 8, 8, 8]];
		const newState = [[8, 0, 0, 0], [8, 16, 8, 0], [16, 8, 0, 0]];
		const keyCode = 37;

		let $ = moving(oldState, keyCode);
		expect($).toEqual(newState);
	});

	it('Arrow right move event', () => {
		const oldState = [[2, 0, 0, 0], [8, 0, 0, 0], [0, 8, 8, 8]];
		const newState = [[0, 0, 0, 2], [0, 0, 0, 8], [0, 0, 8, 16]];
		const keyCode = 39;

		let $ = moving(oldState, keyCode);
		expect($).toEqual(newState);
	});

	it('Arrow up move event', () => {
		const oldState = [[8, 0, 8, 8], [0, 0, 2, 0], [0, 8, 8, 8]];
		const newState = [[8, 8, 8, 16], [0, 0, 2, 0], [0, 0, 8, 0]];
		const keyCode = 38;

		let $ = moving(oldState, keyCode);
		expect($).toEqual(newState);
	});

	it('Arrow down move event', () => {
		const oldState = [[0, 0, 8, 8], [0, 0, 2, 0], [0, 8, 8, 8]];
		const newState = [[0, 0, 8, 0], [0, 0, 2, 0], [0, 8, 8, 16]];
		const keyCode = 40;

		let $ = moving(oldState, keyCode);
		expect($).toEqual(newState);
	});

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

	it('Do not added the active block If the states is equal after moving', () => {
		let keyCode = 37;
		let localStorage = { playground: [[8, 16, 0], [1024, 0, 0]], count: 2, width: 3, height: 2 }; //localStorage imitation

		mountEvent(localStorage);
		moveEvent(keyCode);

		let playgroundStore = $playground.getState();
		expect(playgroundStore).toEqual(localStorage.playground);
	});
	
	it.todo('Floating bug with incorrect number of active blocks');
});
