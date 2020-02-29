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

$playground.updates.watch((playground) =>
	window.localStorage.setItem('playground', JSON.stringify(playground))
);

export const playgroundApi = createApi($playground, {
	mount: (_, { playground, count, width, height }) => ({
		...(playground || generation(count, width, height)),
		width: width - 1,
		height: height - 1
	}),
	newGame: (_, { count, width, height }) => generation(count, width, height),
	moveLeft: (state) => ({ ...state, tiles: decrease(state, 'x') }),
	moveRight: (state) => ({ ...state, tiles: increase(state, 'x') }),
	moveUp: (state) => ({ ...state, tiles: decrease(state, 'y') }),
	moveDown: (state) => ({ ...state, tiles: increase(state, 'y') }),
	updateSettings: () => {}
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

// ---------- MECHANICS
// TODO: refactor
export function subsetFormation(tiles, coordinate) {
	let subsets = [];
	let uniqueSecondCoordinate = new Set();
	const searchCoordinate = coordinate === 'x' ? 'y' : 'x';

	for (let i = 0; i < tiles.length; i++) {
		uniqueSecondCoordinate.add(tiles[i][searchCoordinate]);
	}

	for (let value of uniqueSecondCoordinate) {
		subsets.push(
			tiles
				.filter((subValue) => subValue[searchCoordinate] === value) // фильтрацию лучше сделать при генерации
				.sort((a, b) => a[coordinate] - b[coordinate])
		);
	}

	return subsets;
}

export function subsetIntegration(tiles) {
	let flat = [];
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			flat.push(tiles[i][j]);
		}
	}

	return flat;
}

export function tileGeneration(tiles, { width, height }) {
	let target = true;
	let _tiles = [...tiles];
	while (target) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

		target = _tiles.find((tile) => tile.x === xСoordinate && tile.y === yСoordinate);

		if (!target) {
			_tiles.push({
				x: xСoordinate,
				y: yСoordinate,
				value: 2
			});

			return _tiles;
		}
	}
}

// ------------- IndexDecrease

export function decreaseMoveToFreeSpace(tiles, coordinate) {
	let _tiles = [...tiles];

	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			tiles[i][j][coordinate] = j;
		}
	}

	return _tiles;
}

export function decreaseFindSameBlocksAndMerge(tiles) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		for (let j = 0; j < _tiles[i].length - 1; j++) {
			if (_tiles[i][j].value === _tiles[i][j + 1].value) {
				_tiles[i][j].value *= 2;
				_tiles[i].splice(j + 1, 1);
				break;
			}
		}
	}

	return _tiles;
}

// -------------- IndexIncrease

export function increaseMoveToFreeSpace(tiles, size, coordinate) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		let _size = size;
		for (let j = _tiles[i].length - 1; j >= 0; j--) {
			_tiles[i][j][coordinate] = _size;
			--_size;
		}
	}

	return _tiles;
}

export function increaseFindSameBlocksAndMerge(tiles) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		for (let j = 0; j < _tiles[i].length - 1; j++) {
			if (_tiles[i][j].value === _tiles[i][j + 1].value) {
				_tiles[i][j].value *= 2;
				_tiles[i].splice(j + 1, 1);
				break;
			}
		}
	}

	return _tiles;
}
