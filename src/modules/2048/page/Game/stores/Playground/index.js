import { createApi } from 'effector';

import { gameDomain } from '../../domain';
import { IndexDecrease, IndexIncrease } from '../mechanics';

import { generation, random, equal, full, scoring, moving, winning } from '../../../../helpers';

const $playground = gameDomain.store({
	tiles: [],
	cells: [],
	moveCount: 0
});

export const playgroundApi = createApi($playground, {
	mount: (_, { playground, count, width, height }) =>
		playground || generation(count, width, height),
	newGame: (_, { count, width, height }) => {
		// ?
	},
	moveLeft: () => new IndexDecrease(state.tiles, 'x'),
	moveRight: () => new IndexDecrease(state.tiles, 'y'),
	moveUp: () => new IndexIncrease(state.tiles, 'x'),
	moveDown: () => new IndexIncrease(state.tiles, 'y'),
	updateSettings: () => {}
});

/**
 * разобраться с newGame (проблема с эвентами скора)
 * мехника
 */
