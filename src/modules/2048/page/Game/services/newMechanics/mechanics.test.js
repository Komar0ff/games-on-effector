import IndexDecrease from './mechanics.js';

it('Понижение индекса', () => {
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
			.subsetIntegration()
	).toEqual([
		{ x: 0, y: 1, value: 2 },
		{ x: 1, y: 1, value: 4 },
		{ x: 0, y: 2, value: 16 },
		{ x: 1, y: 2, value: 8 },
		{ x: 0, y: 0, value: 8 }
	]);
});

it('формирование подмножеств', () => {
	const xOffsetArray = [
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 4, y: 2, value: 8 },
		{ x: 1, y: 2, value: 8 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	];

	const indexDecreaseX = new IndexDecrease(xOffsetArray, 'x');

	expect(indexDecreaseX.subsetFormation().data).toEqual([
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

	expect(indexDecreaseY.subsetFormation().data).toEqual([
		[{ x: 0, y: 1, value: 2 }],
		[{ x: 3, y: 1, value: 4 }],
		[{ x: 4, y: 2, value: 8 }],
		[{ x: 1, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }, { x: 2, y: 2, value: 8 }]
	]);
});

it('Поиск и мердж одинаковых блоков', () => {
	const xOffsetArray = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 8 }, { x: 3, y: 2, value: 8 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecreaseX = new IndexDecrease(xOffsetArray, 'x');

	expect(indexDecreaseX.findSameBlocksAndMerge().data).toEqual([
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	]);
});

it('Перемещение на пустое пространство', () => {
	const array = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecrease = new IndexDecrease(array, 'x');

	expect(indexDecrease.moveToFreeSpace().data).toEqual([
		[{ x: 0, y: 1, value: 2 }, { x: 1, y: 1, value: 4 }],
		[{ x: 0, y: 2, value: 16 }, { x: 1, y: 2, value: 8 }],
		[{ x: 0, y: 0, value: 8 }]
	]);
});

it('Объединение подмножеств в один массив', () => {
	const array = [
		[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
		[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
		[{ x: 2, y: 0, value: 8 }]
	];

	const indexDecrease = new IndexDecrease(array, 'x');

	expect(indexDecrease.subsetIntegration()).toEqual([
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 1, y: 2, value: 16 },
		{ x: 4, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	]);
});
