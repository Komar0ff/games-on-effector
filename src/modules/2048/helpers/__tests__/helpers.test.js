import {
	generation,
	random,
	equal,
	full,
	scoring,
	moving,
	winning,
	tileGeneration,
	cellsGeneration,
	newGeneration
} from '../index';
import { helpersMock } from '../__mocks__/helpers.mock.js';

it('Tile generation', () => {
	expect(tileGeneration(4, 10, 10).length).toBe(4);
	expect(tileGeneration(7, 10, 10)[0].x < 10 && tileGeneration(7, 10, 10)[0].y < 10).toBeTruthy();
});

it('Cells generation', () => {
	// array of arrays? really needed?
	expect(cellsGeneration(10, 10).length).toBe(10);
	expect(cellsGeneration(10, 10)[5].length).toBe(10);
});

it('new generation', () => {
	expect(newGeneration(2, 10, 10).cells.length).toBe(10);
	expect(newGeneration(2, 10, 10).tiles.length).toBe(2);
});

describe.skip('Helpers', () => {
	let playgroundActiveBlocks = 3;
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	it('Generating a playground', () => {
		let generator = generation(playgroundActiveBlocks, playgroundWidth, playgroundHeight);

		expect(generator.length).toBe(playgroundHeight);
		expect(generator[0].length).toBe(playgroundWidth);

		let counterActiveBlock = 0;
		for (let i = 0; i < playgroundHeight; i++) {
			for (let j = 0; j < playgroundWidth; j++) {
				if (generator[i][j] > 0) ++counterActiveBlock;
			}
		}

		expect(counterActiveBlock).toBe(playgroundActiveBlocks);
	});

	// prettier-ignore
	it('Array equal', () => {
		expect(
			equal(
				[[0, 0, 8], [0, 1024, 0]], 
				[[0, 0, 8], [0, 1024, 2]]
			)
		).toBeFalsy(); // not equal
	});

	it('Array full', () => {
		expect(full([[1, 4, 4], [3, 4, 5]])).toBeTruthy(); // array is full
		expect(full([[1, 0, 4], [3, 4, 5]])).toBeFalsy(); // array is not full
	});

	it('Scoring', () => {
		expect(scoring([[1024, 0, 0], [16, 1024, 2]])).toBe(2066);
	});

	it('Is there a 2048?', () => {
		expect(winning([[16, 0, 0], [16, 2048, 2]])).toBeTruthy();
	});

	it('Move left/right/up/down', () => {
		let moveLeft = moving(helpersMock.left.oldState, helpersMock.left.keyCode);
		let moveRight = moving(helpersMock.right.oldState, helpersMock.right.keyCode);
		let moveUp = moving(helpersMock.up.oldState, helpersMock.up.keyCode);
		let moveDown = moving(helpersMock.down.oldState, helpersMock.down.keyCode);

		expect(moveLeft).toEqual(helpersMock.left.newState);
		expect(moveRight).toEqual(helpersMock.right.newState);
		expect(moveUp).toEqual(helpersMock.up.newState);
		expect(moveDown).toEqual(helpersMock.down.newState);
	});
});
