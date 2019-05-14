import { mountEvent, newGameEvent } from '../events.js';
import { $playground, generation, random, moving } from '../stores';

// TODO: fix problem with isolation.
it('Drawing a playground based on height and width and random generation of active blocks', () => {
	let countActiveBlocks = 3; // No more than three
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	let generator = generation(countActiveBlocks, playgroundWidth, playgroundHeight);
	let randomizer = random(countActiveBlocks, playgroundWidth, playgroundHeight);

	expect(randomizer.length).toBe(3);
	expect(randomizer[2].length).toBe(2);
	expect(Number.isInteger(randomizer[0][0])).toBeTruthy();

	expect(generator.length).toBe(playgroundHeight);
	expect(generator[0].length).toBe(playgroundWidth);

	let counterActiveBlock = 0;
	for (let i = 0; i < playgroundHeight; i++) {
		for (let j = 0; j < playgroundWidth; j++) {
			if (generator[i][j] > 0) ++counterActiveBlock;
		}
	}

	expect(counterActiveBlock).toBe(countActiveBlocks);
});

it('Playground mounting with empty playground', () => {
	let localStorage = { playground: [], count: 2, width: 3, height: 4 }; //localStorage imitation

	expect($playground.getState()).toEqual([]);
	mountEvent(localStorage);

	let playgroundStore = $playground.getState(); // storage state after mounting
	expect(playgroundStore.length).toBe(4);
	expect(playgroundStore[0].length).toBe(3);
});

it('Playground mounting with playground', () => {
	let playgroundStore = $playground.getState();
	let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 4 }; //localStorage imitation

	mountEvent(localStorage);

	playgroundStore = $playground.getState(); // storage state after mounting
	expect(playgroundStore.length).toBe(2);
	expect(playgroundStore[0].length).toBe(3);
});

it('newGame event', () => {
	let localStorage = { playground: [], count: 2, width: 3, height: 4 };

	newGameEvent(localStorage);
	let playgroundStore = $playground.getState();

	expect(playgroundStore.length).toBe(4);
	expect(playgroundStore[0].length).toBe(3);
});

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

it.only('Arrow down move event', () => {
	const oldState = [[0, 0, 8, 8], [0, 0, 2, 0], [0, 8, 8, 8]];
	const newState = [[0, 0, 8, 0], [0, 0, 2, 0], [0, 8, 8, 16]];
	const keyCode = 40;

	let $ = moving(oldState, keyCode);
	expect($).toEqual(newState);
});
