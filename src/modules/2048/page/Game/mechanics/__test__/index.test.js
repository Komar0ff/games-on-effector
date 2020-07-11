import {
	subsetFormation,
	subsetIntegration,
	tileGeneration,
	decreseMoveToFreeSpace,
	decreseFindSameBlocksAndMerge,
	increaseMoveToFreeSpace,
	increaseFindSameBlocksAndMerge,
} from '../index';

describe('subsetFormation', () => {
	let tiles = [
		{ x: 0, y: 2, value: 4 },
		{ x: 2, y: 1, value: 2 },
		{ x: 2, y: 2, value: 8 },
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

it.todo('subsetIntegration');
//  describe('Index decrease tests',  () => {
//
//  })
//
//  describe('Index increase tests',  () => {
//
//  })
