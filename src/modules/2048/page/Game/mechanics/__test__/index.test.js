import {
	subsetFormation,
	tileGeneration,
	decreaseMoveToFreeSpace,
	mergeBlocks,
	increaseMoveToFreeSpace,
	objectComparison,
} from '../index';

describe('subsetFormation', () => {
	let tiles = [
		{ x: 0, y: 2, value: 4 },
		{ x: 2, y: 1, value: 2 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 16 },
	];

	let resultTiles = [
		[{ x: 0, y: 2, value: 4 }],
		[
			{ x: 2, y: 0, value: 16 },
			{ x: 2, y: 1, value: 2 },
			{ x: 2, y: 2, value: 8 },
		],
	];

	it('should return an array of arrays of uniqal rows', () => {
		expect(subsetFormation(tiles, 'y')).toEqual(resultTiles);
	});
});

describe('tileGeneration', () => {
	let tiles = [
		{ x: 0, y: 0, value: 2 },
		{ x: 0, y: 1, value: 4 },
		{ x: 1, y: 0, value: 8 },
		{ x: 1, y: 1, value: 16 },
	];

	it('should return 5 tiles', () => {
		expect(tileGeneration(tiles, { width: 5, height: 5 }).length).toBe(5);
	});

	it("shouldn't return 5 tiles coz there are no empty cells", () => {
		expect(tileGeneration(tiles, { width: 2, height: 2 }).length).toBe(4);
	});
});

describe('objectComparison', () => {
	it("shouldn't return true coz not found", () => {
		expect(
			objectComparison(
				[
					{ x: 2, y: 1 },
					{ x: 1, y: 3 },
				],
				{ x: 1, y: 2 }
			)
		).toBeFalsy();
	});

	it('should return true coz found', () => {
		expect(
			objectComparison(
				[
					{ x: 2, y: 1 },
					{ x: 1, y: 2 },
				],
				{ x: 1, y: 2 }
			)
		).toBeTruthy();
	});
});

describe('mergeBlocks', () => {
	describe('> decrease move', () => {
		it('should change after move', () => {
			let inputTiles = [
				[{ x: 0, y: 2, value: 4 }],
				[
					{ x: 2, y: 0, value: 2 },
					{ x: 2, y: 1, value: 2 },
					{ x: 2, y: 2, value: 8 },
				],
			];

			let outputTiles = [
				[{ x: 0, y: 2, value: 4 }],
				[
					{ x: 2, y: 0, value: 4 },
					{ x: 2, y: 2, value: 8 },
				],
			];

			expect(mergeBlocks(inputTiles)).toEqual(outputTiles);
		});

		it("shouldn't change after move", () => {
			let tiles = [
				[
					{ x: 0, y: 0, value: 2 },
					{ x: 1, y: 0, value: 16 },
					{ x: 2, y: 0, value: 8 },
				],
			];
			expect(mergeBlocks(tiles)).toEqual(tiles);
		});
	});

	describe('> increase move', () => {
		it("shouldn't change after move", () => {
			let tiles = [
				[
					{ x: 0, y: 0, value: 2 },
					{ x: 1, y: 0, value: 16 },
					{ x: 2, y: 0, value: 8 },
				],
			];
			expect(mergeBlocks(tiles, 'increase')).toEqual(tiles);
		});
		it('should change after move', () => {
			let inputTiles = [
				[
					{ x: 0, y: 0, value: 2 },
					{ x: 1, y: 0, value: 2 },
					{ x: 2, y: 0, value: 2 },
					{ x: 3, y: 0, value: 8 },
				],
			];

			let outputTiles = [
				[
					{ x: 0, y: 0, value: 2 },
					{ x: 2, y: 0, value: 4 },
					{ x: 3, y: 0, value: 8 },
				],
			];

			expect(mergeBlocks(inputTiles, 'increase')).toEqual(outputTiles);
		});
	});
});
