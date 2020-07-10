import { createApi } from 'effector';

import { gameDomain } from '../../domain';
import { generation } from '../../../../helpers';

import {
	subsetFormation,
	subsetIntegration,
	tileGeneration,
	decreseMoveToFreeSpace,
	decreseFindSameBlocksAndMerge,
	increaseMoveToFreeSpace,
	increaseFindSameBlocksAndMerge,
	decreaseFindSameBlocksAndMerge,
	decreaseMoveToFreeSpace,
} from '../../mechanics';

export const $playground = gameDomain.store({
	tiles: [],
	cells: [],
	width: 5,
	height: 5,
	moveCount: 0,
});

$playground.updates.watch((playground) =>
	window.localStorage.setItem('playground', JSON.stringify(playground))
);

export const playgroundApi = createApi($playground, {
	mount: (_, { playground, count, width, height }) => ({
		...(playground || generation(count, width, height)),
		width: width - 1,
		height: height - 1,
	}),
	newGame: (_, { count, width, height }) => generation(count, width, height),
	moveLeft: (state) => ({ ...state, tiles: decrease(state, 'x') }),
	moveRight: (state) => ({ ...state, tiles: increase(state, 'x') }),
	moveUp: (state) => ({ ...state, tiles: decrease(state, 'y') }),
	moveDown: (state) => ({ ...state, tiles: increase(state, 'y') }),
	updateSettings: () => {},
});

function decrease(state, coordinate) {
	return (
		state.tiles
		|> ((_) => subsetFormation(_, coordinate))
		|> decreaseFindSameBlocksAndMerge
		|> ((_) => decreaseMoveToFreeSpace(_, coordinate))
		|> subsetIntegration
		|> ((_) => tileGeneration(_, state))
	);
}

function increase(state, coordinate) {
	let vector = coordinate === 'x' ? state.width : state.height;

	return (
		state.tiles
		|> ((_) => subsetFormation(_, coordinate))
		|> increaseFindSameBlocksAndMerge
		|> ((_) => increaseMoveToFreeSpace(_, vector, coordinate))
		|> subsetIntegration
		|> ((_) => tileGeneration(_, state))
	);
}
