import {
	generation,
	equal,
	full,
	scoring,
	winning,
	tileGeneration,
	cellsGeneration
} from '../index';

it('Tile generation', () => {
	expect(tileGeneration(4, 10, 10).length).toBe(4);
	expect(tileGeneration(7, 10, 10)[0].x < 10 && tileGeneration(7, 10, 10)[0].y < 10).toBeTruthy();
});

it('Cells generation', () => {
	expect(cellsGeneration(10, 10).length).toBe(10);
	expect(cellsGeneration(10, 10)[5].length).toBe(10);
});

it('Generating a playground', () => {
	expect(generation(2, 10, 10).cells.length).toBe(10);
	expect(generation(2, 10, 10).tiles.length).toBe(2);
});

describe.skip('Helpers', () => {
	let playgroundActiveBlocks = 3;
	let playgroundWidth = 3;
	let playgroundHeight = 4;

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
});
