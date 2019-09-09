import {
	indexDecrease,
	findSameBlocksAndMerge,
	moveToFreeSpace,
	subsetFormation,
	subsetIntegration
} from './mechanics.js';

it('Понижение индекса', () => {
	const xOffsetArray = [
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 4, y: 2, value: 8 },
		{ x: 1, y: 2, value: 8 },
		{ x: 2, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	];
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

	expect(subsetFormation(xOffsetArray, 'x')).toEqual([
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

	expect(subsetFormation(yOffsetArray, 'y')).toEqual([
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

	expect(findSameBlocksAndMerge(xOffsetArray, 'x')).toEqual([
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

	expect(moveToFreeSpace(array, 'x')).toEqual([
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

	expect(subsetIntegration(array)).toEqual([
		{ x: 0, y: 1, value: 2 },
		{ x: 3, y: 1, value: 4 },
		{ x: 1, y: 2, value: 16 },
		{ x: 4, y: 2, value: 8 },
		{ x: 2, y: 0, value: 8 }
	]);
});
