import IndexDecrease from '../index';

it('Index decrease', () => {
	const xOffsetArray = [
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 4, y: 2, value: 8 },
		{ x: 1, y: 2, value: 8 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	];

	const indexDecreaseX = new IndexDecrease(xOffsetArray, 'x');
	expect(
		indexDecreaseX
			.subsetFormation()
			.findSameBlocksAndMerge()
			.moveToFreeSpace()
			.subsetIntegration().tiles
	).toEqual([
		{ x: 0, y: 1, value: 2 },
		{ x: 1, y: 1, value: 4 },
		{ x: 0, y: 2, value: 16 },
		{ x: 1, y: 2, value: 8 },
		{ x: 0, y: 0, value: 8 }
	]);
});

it('Subset formation', () => {
	const xOffsetArray = [
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 4, y: 2, value: 8 },
		{ x: 1, y: 2, value: 8 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	];

	const indexDecreaseX = new IndexDecrease(xOffsetArray, 'x');

	expect(indexDecreaseX.subsetFormation().tiles).toEqual([
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 8 }, { x: 2, y: 2, value: 8 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	]);

	const yOffsetArray = [
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 4, y: 2, value: 8 },
		{ x: 1, y: 2, value: 8 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	];

	const indexDecreaseY = new IndexDecrease(yOffsetArray, 'y');

	expect(indexDecreaseY.subsetFormation().tiles).toEqual([
		[{ x: 0, y: 1, value: 2 }],
		[{ x: 3, y: 1, value: 4 }],
		[{ x: 4, y: 2, value: 8 }],
		[{ x: 1, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }, { x: 2, y: 2, value: 8 }]
	]);
});

it('Search and merge the same blocks', () => {
	const xOffsetArray = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 8 }, { x: 3, y: 2, value: 8 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecreaseX = new IndexDecrease(xOffsetArray, 'x');

	expect(indexDecreaseX.findSameBlocksAndMerge().tiles).toEqual([
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	]);
});

it('Moving to an empty space', () => {
	const array = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecrease = new IndexDecrease(array, 'x');

	expect(indexDecrease.moveToFreeSpace().tiles).toEqual([
		[{ x: 0, y: 1, value: 2 }, { x: 1, y: 1, value: 4 }],
		[{ x: 0, y: 2, value: 16 }, { x: 1, y: 2, value: 8 }],
		[{ x: 0, y: 0, value: 8 }]
	]);
});

it('Combining subsets into a single array', () => {
	const array = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecrease = new IndexDecrease(array, 'x');

	expect(indexDecrease.subsetIntegration().tiles).toEqual([
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 1, y: 2, value: 16 },
		{ x: 4, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	]);
});

it('Add new tile', () => {
	const indexDecrease = new IndexDecrease(
		[
			{ x: 0, y: 1, value: 2 },
			{ x: 3, y: 1, value: 4 },
			{ x: 1, y: 2, value: 16 },
			{ x: 4, y: 2, value: 8 },
			{ x: 2, y: 0, value: 8 }
		],
		'x'
	);

	expect(indexDecrease.tileGeneration(5, 5).length).toBe(6);
});
