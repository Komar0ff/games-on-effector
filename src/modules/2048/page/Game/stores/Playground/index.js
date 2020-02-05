import { createApi } from 'effector';

import { gameDomain } from '../../domain';
import { IndexDecrease, IndexIncrease } from '../../mechanics';

import { generation } from '../../../../helpers';

export const $playground = gameDomain.store({
	tiles: [],
	cells: [],
	width: 5,
	height: 5,
	moveCount: 0
});

export const playgroundApi = createApi($playground, {
	mount: (_, { playground, count, width, height }) => ({
		...(playground || generation(count, width, height)),
		width: width - 1,
		height: height - 1
	}),
	moveLeft: (state) => ({ ...state, tiles: decrease(state, 'x') }),
	moveRight: (state) => ({ ...state, tiles: increase(state, 'x') }),
	moveUp: (state) => ({ ...state, tiles: decrease(state, 'y') }),
	moveDown: (state) => ({ ...state, tiles: increase(state, 'y') }),
	updateSettings: () => {}
});

function decrease(state, coordinate) {
	let result = new IndexDecrease(state.tiles, coordinate);

	result
		.subsetFormation()
		.findSameBlocksAndMerge()
		.moveToFreeSpace()
		.subsetIntegration()
		.tileGeneration(state.width, state.height);

	return result.tiles;
}

function increase(state, coordinate) {
	let result = new IndexIncrease(state.tiles, coordinate);
	let vector = coordinate === 'x' ? state.width : state.height;

	result
		.subsetFormation()
		.findSameBlocksAndMerge()
		.moveToFreeSpace(vector)
		.subsetIntegration()
		.tileGeneration(state.width, state.height);

	return result.tiles;
}
